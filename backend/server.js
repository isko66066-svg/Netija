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
const ADMIN_KEY = process.env.ADMIN_KEY || "";

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "ok", service: "Netija Backend" }));
app.get("/api/health", (req, res) => res.json({ ok: true, message: "Netija Premium server работает" }));

function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function publicUser(user) {
    return {
        id: user.id,
        email: user.email,
        premium: Boolean(user.premium),
        premiumUntil: user.premium_until || null,
        subscriptionStatus: user.subscription_status || "inactive"
    };
}

function getTashkentDate() {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Tashkent",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date());
}

function refreshPremiumStatus(user) {
    if (
        user.premium &&
        user.premium_until &&
        new Date(user.premium_until).getTime() <= Date.now()
    ) {
        db.prepare(`
            UPDATE users
            SET premium = 0, subscription_status = 'expired'
            WHERE id = ?
        `).run(user.id);

        user.premium = 0;
        user.subscription_status = "expired";
    }

    return user;
}

function requireAdmin(req, res) {
    if (!ADMIN_KEY) {
        res.status(503).json({ error: "ADMIN_KEY не настроен на сервере" });
        return false;
    }

    const providedKey = String(req.get("X-Admin-Key") || "");

    if (!providedKey || providedKey !== ADMIN_KEY) {
        res.status(403).json({ error: "Недостаточно прав" });
        return false;
    }

    return true;
}

// Google frontend sync.
app.post("/api/auth/sync", (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Нужен корректный email" });
    }

    let user = db.prepare(`
        SELECT id, email, password_hash, premium, premium_until, subscription_status
        FROM users
        WHERE email = ?
    `).get(email);

    if (!user) {
        const password = crypto.randomBytes(32).toString("hex");

        const result = db.prepare(`
            INSERT INTO users (email, password_hash)
            VALUES (?, ?)
        `).run(email, hashPassword(password));

        user = db.prepare(`
            SELECT id, email, premium, premium_until, subscription_status
            FROM users
            WHERE id = ?
        `).get(result.lastInsertRowid);
    }

    refreshPremiumStatus(user);

    res.json({
        success: true,
        user: publicUser(user)
    });
});

// Админ: выдать Pro пользователю.
app.post("/api/admin/grant-pro", (req, res) => {
    if (!requireAdmin(req, res)) return;

    const email = String(req.body?.email || "").trim().toLowerCase();
    const days = Number(req.body?.days || 3650);

    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Нужен корректный email" });
    }

    if (!Number.isFinite(days) || days <= 0 || days > 36500) {
        return res.status(400).json({ error: "Некорректное количество дней" });
    }

    const user = db.prepare(`
        SELECT id, email, premium_until
        FROM users
        WHERE email = ?
    `).get(email);

    if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }

    const oldUntil = user.premium_until
        ? new Date(user.premium_until).getTime()
        : 0;

    const start = Math.max(Date.now(), Number.isFinite(oldUntil) ? oldUntil : 0);
    const premiumUntil = new Date(
        start + days * 24 * 60 * 60 * 1000
    ).toISOString();

    db.prepare(`
        UPDATE users
        SET premium = 1,
            premium_until = ?,
            subscription_status = 'active'
        WHERE id = ?
    `).run(premiumUntil, user.id);

    res.json({
        success: true,
        message: "Pro выдан",
        user: email,
        premiumUntil
    });
});

// Админ: забрать Pro у пользователя.
app.post("/api/admin/revoke-pro", (req, res) => {
    if (!requireAdmin(req, res)) return;

    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Нужен корректный email" });
    }

    const result = db.prepare(`
        UPDATE users
        SET premium = 0,
            premium_until = NULL,
            subscription_status = 'cancelled'
        WHERE email = ?
    `).run(email);

    if (result.changes === 0) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({
        success: true,
        message: "Pro отключён",
        user: email
    });
});

app.get("/api/me", (req, res) => {
    const email = String(req.query.email || "").trim().toLowerCase();

    if (!email) {
        return res.status(401).json({ error: "Пользователь не указан" });
    }

    const user = db.prepare(`
        SELECT id, email, premium, premium_until, subscription_status
        FROM users
        WHERE email = ?
    `).get(email);

    if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }

    refreshPremiumStatus(user);
    res.json(publicUser(user));
});

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

    refreshPremiumStatus(user);

    res.json({
        premium: Boolean(user.premium),
        premiumUntil: user.premium_until,
        subscriptionStatus: user.subscription_status
    });
});

// Проверка и атомарное использование бесплатного теста.
app.post("/api/tests/daily-access", (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const testId = String(req.body?.testId || "").trim();

    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Нужен корректный email" });
    }

    if (!testId) {
        return res.status(400).json({ error: "testId не указан" });
    }

    const user = db.prepare(`
        SELECT id, email, premium, premium_until, subscription_status
        FROM users
        WHERE email = ?
    `).get(email);

    if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }

    refreshPremiumStatus(user);

    if (user.premium) {
        return res.json({
            allowed: true,
            premium: true,
            usageDate: getTashkentDate()
        });
    }

    const usageDate = getTashkentDate();

    const result = db.prepare(`
        INSERT OR IGNORE INTO daily_test_usage
            (user_id, usage_date, test_id, created_at)
        VALUES (?, ?, ?, ?)
    `).run(user.id, usageDate, testId, Date.now());

    if (result.changes === 0) {
        const usage = db.prepare(`
            SELECT test_id
            FROM daily_test_usage
            WHERE user_id = ? AND usage_date = ?
        `).get(user.id, usageDate);

        return res.status(409).json({
            allowed: false,
            premium: false,
            error: "DAILY_LIMIT_REACHED",
            message: "Вы уже прошли тест сегодня.",
            usageDate,
            usedTestId: usage?.test_id || null
        });
    }

    return res.json({
        allowed: true,
        premium: false,
        usageDate,
        usedTestId: testId
    });
});

app.get("/api/admin/users-count", (req, res) => {
    const result = db.prepare("SELECT COUNT(*) AS count FROM users").get();
    res.json({ users: result.count });
});

app.post("/api/auth/register", (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) {
        return res.status(400).json({ error: "Введите email и пароль" });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Пароль должен содержать минимум 6 символов" });
    }

    if (db.prepare("SELECT id FROM users WHERE email = ?").get(email)) {
        return res.status(409).json({ error: "Пользователь с таким email уже существует" });
    }

    const result = db.prepare(`
        INSERT INTO users (email, password_hash)
        VALUES (?, ?)
    `).run(email, hashPassword(password));

    res.json({
        success: true,
        user: {
            id: result.lastInsertRowid,
            email,
            premium: false
        }
    });
});

app.post("/api/auth/login", (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) {
        return res.status(400).json({ error: "Введите email и пароль" });
    }

    const user = db.prepare(`
        SELECT id, email, password_hash, premium, premium_until, subscription_status
        FROM users
        WHERE email = ?
    `).get(email);

    if (!user || user.password_hash !== hashPassword(password)) {
        return res.status(401).json({ error: "Неверный email или пароль" });
    }

    refreshPremiumStatus(user);

    res.json({
        success: true,
        user: publicUser(user)
    });
});

app.post("/api/payments/payme/create-order", (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Нужен корректный email" });
    }

    if (!PAYME_MERCHANT_ID) {
        return res.status(503).json({ error: "PAYME_MERCHANT_ID ещё не настроен" });
    }

    if (!Number.isInteger(PREMIUM_AMOUNT_TIIYN) || PREMIUM_AMOUNT_TIIYN <= 0) {
        return res.status(503).json({ error: "PREMIUM_AMOUNT_TIIYN ещё не настроен" });
    }

    let user = db.prepare("SELECT id FROM users WHERE email = ?").get(email);

    if (!user) {
        const password = crypto.randomBytes(32).toString("hex");
        const result = db.prepare(`
            INSERT INTO users (email, password_hash)
            VALUES (?, ?)
        `).run(email, hashPassword(password));
        user = { id: result.lastInsertRowid };
    }

    const orderId = crypto.randomBytes(12).toString("hex");

    db.prepare(`
        INSERT INTO premium_orders
            (order_id, user_id, email, amount, status, created_at)
        VALUES (?, ?, ?, ?, 'pending', ?)
    `).run(
        orderId,
        user.id,
        email,
        PREMIUM_AMOUNT_TIIYN,
        Date.now()
    );

    res.json({
        success: true,
        orderId,
        amount: PREMIUM_AMOUNT_TIIYN,
        merchant: PAYME_MERCHANT_ID,
        account: { order_id: orderId },
        checkoutUrl: "https://checkout.paycom.uz/"
    });
});

function paymeError(code, message, data) {
    const error = {
        code,
        message: {
            ru: message,
            uz: message,
            en: message
        }
    };

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
        const decoded = Buffer.from(
            header.slice(6),
            "base64"
        ).toString("utf8");

        const i = decoded.indexOf(":");

        return (
            i > -1 &&
            decoded.slice(0, i) === PAYME_LOGIN &&
            decoded.slice(i + 1) === PAYME_KEY
        );
    } catch {
        return false;
    }
}

function getOrder(account) {
    const orderId = String(account?.order_id || "").trim();

    return orderId
        ? db.prepare(`
            SELECT *
            FROM premium_orders
            WHERE order_id = ?
        `).get(orderId)
        : null;
}

function activatePremium(order) {
    const user = db.prepare(`
        SELECT premium_until
        FROM users
        WHERE id = ?
    `).get(order.user_id);

    const oldUntil = user?.premium_until
        ? new Date(user.premium_until).getTime()
        : 0;

    const start = Math.max(
        Date.now(),
        Number.isFinite(oldUntil) ? oldUntil : 0
    );

    const until = new Date(
        start + PREMIUM_DAYS * 86400000
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
    `).run(Date.now(), order.order_id);

    return until;
}

function handlePayme(req, res) {
    const method = req.body?.method;
    const params = req.body?.params || {};
    const id = req.body?.id ?? null;

    if (!isPaymeAuthorized(req)) {
        return res.json(
            paymeError(
                -32504,
                "Недостаточно привилегий для выполнения метода"
            )
        );
    }

    try {
        if (method === "CheckPerformTransaction") {
            const order = getOrder(params.account);

            if (!order) {
                return res.json(
                    paymeError(-31050, "Заказ не найден", "account")
                );
            }

            if (Number(params.amount) !== order.amount) {
                return res.json(paymeError(-31001, "Неверная сумма"));
            }

            if (order.status !== "pending") {
                return res.json(
                    paymeError(-31008, "Невозможно выполнить операцию")
                );
            }

            return res.json(
                paymeSuccess({ allow: true }, id)
            );
        }

        if (method === "CreateTransaction") {
            const paymeId = String(params.id || "");
            const order = getOrder(params.account);

            if (!order) {
                return res.json(
                    paymeError(-31050, "Заказ не найден", "account")
                );
            }

            if (Number(params.amount) !== order.amount) {
                return res.json(paymeError(-31001, "Неверная сумма"));
            }

            const existing = db.prepare(`
                SELECT *
                FROM payme_transactions
                WHERE payme_id = ?
            `).get(paymeId);

            if (existing) {
                return res.json(
                    paymeSuccess({
                        create_time: existing.create_time,
                        transaction: String(existing.id),
                        state: existing.state
                    }, id)
                );
            }

            if (order.status !== "pending") {
                return res.json(
                    paymeError(-31008, "Невозможно выполнить операцию")
                );
            }

            const createTime = Number(params.time) || Date.now();

            const result = db.prepare(`
                INSERT INTO payme_transactions
                    (payme_id, order_id, amount, state, create_time, created_at)
                VALUES (?, ?, ?, 1, ?, ?)
            `).run(
                paymeId,
                order.order_id,
                Number(params.amount),
                createTime,
                Date.now()
            );

            return res.json(
                paymeSuccess({
                    create_time: createTime,
                    transaction: String(result.lastInsertRowid),
                    state: 1
                }, id)
            );
        }

        if (method === "PerformTransaction") {
            const tx = db.prepare(`
                SELECT *
                FROM payme_transactions
                WHERE payme_id = ?
            `).get(String(params.id || ""));

            if (!tx) {
                return res.json(paymeError(-31003, "Транзакция не найдена"));
            }

            if (tx.state === 2) {
                return res.json(
                    paymeSuccess({
                        transaction: String(tx.id),
                        perform_time: tx.perform_time,
                        state: 2
                    }, id)
                );
            }

            if (tx.state !== 1) {
                return res.json(
                    paymeError(-31008, "Невозможно выполнить операцию")
                );
            }

            const order = db.prepare(`
                SELECT *
                FROM premium_orders
                WHERE order_id = ?
            `).get(tx.order_id);

            if (!order || order.status !== "pending") {
                return res.json(
                    paymeError(-31008, "Невозможно выполнить операцию")
                );
            }

            const performTime = Date.now();

            db.prepare(`
                UPDATE payme_transactions
                SET state = 2,
                    perform_time = ?
                WHERE payme_id = ?
            `).run(performTime, tx.payme_id);

            activatePremium(order);

            return res.json(
                paymeSuccess({
                    transaction: String(tx.id),
                    perform_time: performTime,
                    state: 2
                }, id)
            );
        }

        if (method === "CancelTransaction") {
            const tx = db.prepare(`
                SELECT *
                FROM payme_transactions
                WHERE payme_id = ?
            `).get(String(params.id || ""));

            if (!tx) {
                return res.json(paymeError(-31003, "Транзакция не найдена"));
            }

            if (tx.state === -1 || tx.state === -2) {
                return res.json(
                    paymeSuccess({
                        transaction: String(tx.id),
                        cancel_time: tx.cancel_time,
                        state: tx.state
                    }, id)
                );
            }

            const reason = Number(params.reason) || 10;

            if (tx.state === 2 && reason !== 5) {
                return res.json(
                    paymeError(
                        -31007,
                        "Заказ выполнен. Невозможно отменить транзакцию"
                    )
                );
            }

            const cancelTime = Date.now();
            const state = tx.state === 2 ? -2 : -1;

            db.prepare(`
                UPDATE payme_transactions
                SET state = ?,
                    cancel_time = ?,
                    reason = ?
                WHERE payme_id = ?
            `).run(
                state,
                cancelTime,
                reason,
                tx.payme_id
            );

            db.prepare(`
                UPDATE premium_orders
                SET status = 'cancelled'
                WHERE order_id = ?
            `).run(tx.order_id);

            if (tx.state === 2) {
                const order = db.prepare(`
                    SELECT user_id
                    FROM premium_orders
                    WHERE order_id = ?
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

            return res.json(
                paymeSuccess({
                    transaction: String(tx.id),
                    cancel_time: cancelTime,
                    state
                }, id)
            );
        }

        if (method === "CheckTransaction") {
            const tx = db.prepare(`
                SELECT *
                FROM payme_transactions
                WHERE payme_id = ?
            `).get(String(params.id || ""));

            if (!tx) {
                return res.json(paymeError(-31003, "Транзакция не найдена"));
            }

            return res.json(
                paymeSuccess({
                    create_time: tx.create_time,
                    perform_time: tx.perform_time || 0,
                    cancel_time: tx.cancel_time || 0,
                    transaction: String(tx.id),
                    state: tx.state,
                    reason: tx.reason ?? null
                }, id)
            );
        }

        if (method === "GetStatement") {
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
                JOIN premium_orders o
                    ON o.order_id = t.order_id
                WHERE t.create_time >= ?
                  AND t.create_time <= ?
                ORDER BY t.create_time ASC
            `).all(from, to);

            return res.json(
                paymeSuccess({
                    transactions: rows.map(r => ({
                        id: r.id,
                        time: r.time,
                        amount: r.amount,
                        account: { order_id: r.order_id },
                        create_time: r.create_time,
                        perform_time: r.perform_time || 0,
                        cancel_time: r.cancel_time || 0,
                        transaction: String(r.local_id),
                        state: r.state,
                        reason: r.reason ?? null
                    }))
                }, id)
            );
        }

        return res.json(paymeError(-32601, "Метод не найден"));
    } catch (error) {
        console.error("Payme Merchant API error:", error);
        return res.json(paymeError(-32400, "Системная ошибка"));
    }
}

app.post("/payme", handlePayme);
app.post("/payme/", handlePayme);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Netija Premium server запущен на порту ${PORT}`);
});
