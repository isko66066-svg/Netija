require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./database");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

const PAYME_LOGIN = process.env.PAYME_LOGIN || "";
const PAYME_KEY = process.env.PAYME_KEY || "";
const PAYME_MERCHANT_ID = process.env.PAYME_MERCHANT_ID || "";
const PREMIUM_AMOUNT_TIIYN = Number(process.env.PREMIUM_AMOUNT_TIIYN || 0);
const PREMIUM_DAYS = Number(process.env.PREMIUM_DAYS || 30);

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());

/* =========================
   Basic health endpoints
   ========================= */

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        service: "Netija Backend"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        ok: true,
        message: "Netija Premium server работает"
    });
});

/* =========================
   Premium status
   ========================= */

app.get("/api/premium/status", (req, res) => {
    const email = String(req.query.email || "").trim().toLowerCase();

    if (!email) {
        return res.status(400).json({ error: "Email не указан" });
    }

    const user = db.prepare(`
        SELECT id, email, premium, premium_until, subscription_status
        FROM users
        WHERE email = ?
    `).get(email);

    if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }

    // Автоматически выключаем Premium после истечения срока.
    if (user.premium && user.premium_until) {
        const until = new Date(user.premium_until).getTime();
        if (Number.isFinite(until) && until <= Date.now()) {
            db.prepare(`
                UPDATE users
                SET premium = 0,
                    subscription_status = 'expired'
                WHERE id = ?
            `).run(user.id);
            user.premium = 0;
            user.subscription_status = "expired";
        }
    }

    res.json({
        premium: Boolean(user.premium),
        premiumUntil: user.premium_until,
        subscriptionStatus: user.subscription_status
    });
});

/* =========================
   Development/admin helper
   ========================= */

app.get("/api/admin/users-count", (req, res) => {
    const result = db.prepare("SELECT COUNT(*) AS count FROM users").get();
    res.json({ users: result.count });
});

/* =========================
   Email/password auth
   ========================= */

function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

app.post("/api/auth/register", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Введите email и пароль" });
    }

    if (password.length < 6) {
        return res.status(400).json({
            error: "Пароль должен содержать минимум 6 символов"
        });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = db
        .prepare("SELECT id FROM users WHERE email = ?")
        .get(normalizedEmail);

    if (existingUser) {
        return res.status(409).json({
            error: "Пользователь с таким email уже существует"
        });
    }

    const passwordHash = hashPassword(password);
    const result = db.prepare(`
        INSERT INTO users (email, password_hash)
        VALUES (?, ?)
    `).run(normalizedEmail, passwordHash);

    res.json({
        success: true,
        user: {
            id: result.lastInsertRowid,
            email: normalizedEmail,
            premium: false
        }
    });
});

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Введите email и пароль" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const passwordHash = hashPassword(password);

    const user = db.prepare(`
        SELECT id, email, password_hash, premium, premium_until, subscription_status
        FROM users
        WHERE email = ?
    `).get(normalizedEmail);

    if (!user || user.password_hash !== passwordHash) {
        return res.status(401).json({ error: "Неверный email или пароль" });
    }

    res.json({
        success: true,
        user: {
            id: user.id,
            email: user.email,
            premium: Boolean(user.premium),
            premiumUntil: user.premium_until,
            subscriptionStatus: user.subscription_status
        }
    });
});

/* =========================
   Payme payment order creation
   =========================

   Frontend calls this endpoint before opening Payme.
   The Payme account contains only an opaque order_id, not an email.
*/

app.post("/api/payments/payme/create-order", (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Нужен корректный email" });
    }

    if (!PAYME_MERCHANT_ID) {
        return res.status(503).json({
            error: "PAYME_MERCHANT_ID ещё не настроен"
        });
    }

    if (!Number.isInteger(PREMIUM_AMOUNT_TIIYN) || PREMIUM_AMOUNT_TIIYN <= 0) {
        return res.status(503).json({
            error: "PREMIUM_AMOUNT_TIIYN ещё не настроен"
        });
    }

    // Пока Google-auth ещё не связан с backend, создаём техническую запись пользователя.
    // Реальную привязку Google аккаунта сделаем следующим этапом.
    let user = db.prepare("SELECT id FROM users WHERE email = ?").get(email);

    if (!user) {
        const technicalPassword = crypto.randomBytes(32).toString("hex");
        const result = db.prepare(`
            INSERT INTO users (email, password_hash)
            VALUES (?, ?)
        `).run(email, hashPassword(technicalPassword));
        user = { id: result.lastInsertRowid };
    }

    const orderId = crypto.randomBytes(12).toString("hex");
    const now = Date.now();

    db.prepare(`
        INSERT INTO premium_orders (
            order_id, user_id, email, amount, status, created_at
        ) VALUES (?, ?, ?, ?, 'pending', ?)
    `).run(orderId, user.id, email, PREMIUM_AMOUNT_TIIYN, now);

    res.json({
        success: true,
        orderId,
        amount: PREMIUM_AMOUNT_TIIYN,
        merchant: PAYME_MERCHANT_ID,
        account: {
            order_id: orderId
        },
        checkoutUrl: "https://checkout.paycom.uz/"
    });
});

/* =========================
   Payme Merchant API
   ========================= */

function paymeError(code, message, data) {
    const error = { code, message: { ru: message, uz: message, en: message } };
    if (data) error.data = data;
    return { error };
}

function paymeSuccess(result, id) {
    return { result, id };
}

function isPaymeAuthorized(req) {
    if (!PAYME_LOGIN || !PAYME_KEY) return false;

    const header = req.get("Authorization") || "";
    if (!header.startsWith("Basic ")) return false;

    try {
        const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
        const separator = decoded.indexOf(":");
        if (separator === -1) return false;

        const login = decoded.slice(0, separator);
        const password = decoded.slice(separator + 1);
        return login === PAYME_LOGIN && password === PAYME_KEY;
    } catch {
        return false;
    }
}

function getOrderFromAccount(account) {
    const orderId = String(account?.order_id || "").trim();
    if (!orderId) return null;
    return db.prepare(`
        SELECT * FROM premium_orders WHERE order_id = ?
    `).get(orderId);
}

function activatePremium(order) {
    const now = Date.now();
    const currentUser = db.prepare(`
        SELECT premium_until FROM users WHERE id = ?
    `).get(order.user_id);

    const currentUntil = currentUser?.premium_until
        ? new Date(currentUser.premium_until).getTime()
        : 0;

    const start = Math.max(now, Number.isFinite(currentUntil) ? currentUntil : 0);
    const until = new Date(
        start + PREMIUM_DAYS * 24 * 60 * 60 * 1000
    ).toISOString();

    db.prepare(`
        UPDATE users
        SET premium = 1,
            premium_until = ?,
            subscription_status = 'active'
        WHERE id = ?
    `).run(until, order.user_id);

    db.prepare(`
        UPDATE premium_orders
        SET status = 'paid', paid_at = ?
        WHERE order_id = ?
    `).run(now, order.order_id);

    return until;
}

function handlePayme(req, res) {
    const request = req.body || {};
    const method = request.method;
    const params = request.params || {};
    const id = request.id ?? null;

    if (!isPaymeAuthorized(req)) {
        return res.status(200).json(
            paymeError(-32504, "Недостаточно привилегий для выполнения метода", undefined)
        );
    }

    try {
        switch (method) {
            case "CheckPerformTransaction": {
                const amount = Number(params.amount);
                const order = getOrderFromAccount(params.account);

                if (!order) {
                    return res.status(200).json(
                        paymeError(-31050, "Заказ не найден", "account")
                    );
                }

                if (amount !== order.amount) {
                    return res.status(200).json(
                        paymeError(-31001, "Неверная сумма")
                    );
                }

                if (order.status !== "pending") {
                    return res.status(200).json(
                        paymeError(-31008, "Невозможно выполнить операцию")
                    );
                }

                return res.json(paymeSuccess({ allow: true }, id));
            }

            case "CreateTransaction": {
                const paymeId = String(params.id || "");
                const amount = Number(params.amount);
                const order = getOrderFromAccount(params.account);

                if (!order) {
                    return res.status(200).json(
                        paymeError(-31050, "Заказ не найден", "account")
                    );
                }

                if (amount !== order.amount) {
                    return res.status(200).json(
                        paymeError(-31001, "Неверная сумма")
                    );
                }

                const existing = db.prepare(`
                    SELECT * FROM payme_transactions WHERE payme_id = ?
                `).get(paymeId);

                if (existing) {
                    if (existing.order_id !== order.order_id || existing.amount !== amount) {
                        return res.status(200).json(
                            paymeError(-31008, "Невозможно выполнить операцию")
                        );
                    }

                    return res.json(paymeSuccess({
                        create_time: existing.create_time,
                        transaction: String(existing.id),
                        state: existing.state
                    }, id));
                }

                if (order.status !== "pending") {
                    return res.status(200).json(
                        paymeError(-31008, "Невозможно выполнить операцию")
                    );
                }

                const createTime = Number(params.time) || Date.now();
                const result = db.prepare(`
                    INSERT INTO payme_transactions (
                        payme_id, order_id, amount, state, create_time, created_at
                    ) VALUES (?, ?, ?, 1, ?, ?)
                `).run(paymeId, order.order_id, amount, createTime, Date.now());

                return res.json(paymeSuccess({
                    create_time: createTime,
                    transaction: String(result.lastInsertRowid),
                    state: 1
                }, id));
            }

            case "PerformTransaction": {
                const paymeId = String(params.id || "");
                const tx = db.prepare(`
                    SELECT * FROM payme_transactions WHERE payme_id = ?
                `).get(paymeId);

                if (!tx) {
                    return res.status(200).json(
                        paymeError(-31003, "Транзакция не найдена")
                    );
                }

                if (tx.state === 2) {
                    return res.json(paymeSuccess({
                        transaction: String(tx.id),
                        perform_time: tx.perform_time,
                        state: 2
                    }, id));
                }

                if (tx.state !== 1) {
                    return res.status(200).json(
                        paymeError(-31008, "Невозможно выполнить операцию")
                    );
                }

                const order = db.prepare(`
                    SELECT * FROM premium_orders WHERE order_id = ?
                `).get(tx.order_id);

                if (!order || order.status !== "pending") {
                    return res.status(200).json(
                        paymeError(-31008, "Невозможно выполнить операцию")
                    );
                }

                const performTime = Date.now();
                db.prepare(`
                    UPDATE payme_transactions
                    SET state = 2, perform_time = ?
                    WHERE payme_id = ?
                `).run(performTime, paymeId);

                activatePremium(order);

                return res.json(paymeSuccess({
                    transaction: String(tx.id),
                    perform_time: performTime,
                    state: 2
                }, id));
            }

            case "CancelTransaction": {
                const paymeId = String(params.id || "");
                const reason = Number(params.reason) || 10;
                const tx = db.prepare(`
                    SELECT * FROM payme_transactions WHERE payme_id = ?
                `).get(paymeId);

                if (!tx) {
                    return res.status(200).json(
                        paymeError(-31003, "Транзакция не найдена")
                    );
                }

                if (tx.state === -1 || tx.state === -2) {
                    return res.json(paymeSuccess({
                        transaction: String(tx.id),
                        cancel_time: tx.cancel_time,
                        state: tx.state
                    }, id));
                }

                if (tx.state === 2 && reason !== 5) {
                    return res.status(200).json(
                        paymeError(-31007, "Заказ выполнен. Невозможно отменить транзакцию")
                    );
                }

                const cancelTime = Date.now();
                const newState = tx.state === 2 ? -2 : -1;

                db.prepare(`
                    UPDATE payme_transactions
                    SET state = ?, cancel_time = ?, reason = ?
                    WHERE payme_id = ?
                `).run(newState, cancelTime, reason, paymeId);

                db.prepare(`
                    UPDATE premium_orders
                    SET status = 'cancelled'
                    WHERE order_id = ?
                `).run(tx.order_id);

                if (tx.state === 2) {
                    const order = db.prepare(`
                        SELECT user_id FROM premium_orders WHERE order_id = ?
                    `).get(tx.order_id);
                    if (order) {
                        db.prepare(`
                            UPDATE users
                            SET premium = 0,
                                premium_until = NULL,
                                subscription_status = 'cancelled'
                            WHERE id = ?
                        `).run(order.user_id);
                    }
                }

                return res.json(paymeSuccess({
                    transaction: String(tx.id),
                    cancel_time: cancelTime,
                    state: newState
                }, id));
            }

            case "CheckTransaction": {
                const paymeId = String(params.id || "");
                const tx = db.prepare(`
                    SELECT * FROM payme_transactions WHERE payme_id = ?
                `).get(paymeId);

                if (!tx) {
                    return res.status(200).json(
                        paymeError(-31003, "Транзакция не найдена")
                    );
                }

                return res.json(paymeSuccess({
                    create_time: tx.create_time,
                    perform_time: tx.perform_time || 0,
                    cancel_time: tx.cancel_time || 0,
                    transaction: String(tx.id),
                    state: tx.state,
                    reason: tx.reason ?? null
                }, id));
            }

            case "GetStatement": {
                const from = Number(params.from);
                const to = Number(params.to);

                const rows = db.prepare(`
                    SELECT
                        t.payme_id AS id,
                        t.amount,
                        t.create_time AS time,
                        t.create_time,
                        t.perform_time,
                        t.cancel_time,
                        t.state,
                        t.reason,
                        t.id AS local_id,
                        o.order_id
                    FROM payme_transactions t
                    JOIN premium_orders o ON o.order_id = t.order_id
                    WHERE t.create_time >= ? AND t.create_time <= ?
                    ORDER BY t.create_time ASC
                `).all(from, to);

                return res.json(paymeSuccess({
                    transactions: rows.map(row => ({
                        id: row.id,
                        time: row.time,
                        amount: row.amount,
                        account: { order_id: row.order_id },
                        create_time: row.create_time,
                        perform_time: row.perform_time || 0,
                        cancel_time: row.cancel_time || 0,
                        transaction: String(row.local_id),
                        state: row.state,
                        reason: row.reason ?? null
                    }))
                }, id));
            }

            default:
                return res.status(200).json(
                    paymeError(-32601, "Метод не найден")
                );
        }
    } catch (error) {
        console.error("Payme Merchant API error:", error);
        return res.status(200).json(
            paymeError(-32400, "Системная ошибка")
        );
    }
}

app.post("/payme", handlePayme);
app.post("/payme/", handlePayme);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Netija Premium server запущен на порту ${PORT}`);
});
