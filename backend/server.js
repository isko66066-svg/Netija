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

app.get("/", (req, res) => {
    res.json({ status: "ok", service: "Netija Backend" });
});

app.get("/api/health", async (req, res) => {
    try {
        await db.query("SELECT 1");
        res.json({ ok: true, message: "Netija Premium server работает" });
    } catch (error) {
        console.error("Health check error:", error);
        res.status(503).json({ ok: false, message: "Database unavailable" });
    }
});

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

async function refreshPremiumStatus(user) {
    if (
        user.premium &&
        user.premium_until &&
        new Date(user.premium_until).getTime() <= Date.now()
    ) {
        await db.query(`
            UPDATE users
            SET premium = FALSE,
                subscription_status = 'expired'
            WHERE id = $1
        `, [user.id]);

        user.premium = false;
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

app.post("/api/auth/sync", async (req, res) => {
    try {
        const email = String(req.body?.email || "").trim().toLowerCase();

        if (!email || !email.includes("@")) {
            return res.status(400).json({ error: "Нужен корректный email" });
        }

        let user = await db.one(`
            SELECT id, email, password_hash, premium, premium_until, subscription_status
            FROM users
            WHERE email = $1
        `, [email]);

        if (!user) {
            const password = crypto.randomBytes(32).toString("hex");

            user = await db.one(`
                INSERT INTO users (email, password_hash)
                VALUES ($1, $2)
                RETURNING id, email, premium, premium_until, subscription_status
            `, [email, hashPassword(password)]);
        }

        await refreshPremiumStatus(user);

        res.json({
            success: true,
            user: publicUser(user)
        });
    } catch (error) {
        console.error("Auth sync error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
});

app.post("/api/admin/grant-pro", async (req, res) => {
    if (!requireAdmin(req, res)) return;

    try {
        const email = String(req.body?.email || "").trim().toLowerCase();
        const days = Number(req.body?.days || 3650);

        if (!email || !email.includes("@")) {
            return res.status(400).json({ error: "Нужен корректный email" });
        }

        if (!Number.isFinite(days) || days <= 0 || days > 36500) {
            return res.status(400).json({ error: "Некорректное количество дней" });
        }

        const user = await db.one(`
            SELECT id, email, premium_until
            FROM users
            WHERE email = $1
        `, [email]);

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

        await db.query(`
            UPDATE users
            SET premium = TRUE,
                premium_until = $1,
                subscription_status = 'active'
            WHERE id = $2
        `, [premiumUntil, user.id]);

        res.json({
            success: true,
            message: "Pro выдан",
            user: email,
            premiumUntil
        });
    } catch (error) {
        console.error("Grant Pro error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
});

app.post("/api/admin/revoke-pro", async (req, res) => {
    if (!requireAdmin(req, res)) return;

    try {
        const email = String(req.body?.email || "").trim().toLowerCase();

        if (!email || !email.includes("@")) {
            return res.status(400).json({ error: "Нужен корректный email" });
        }

        const result = await db.query(`
            UPDATE users
            SET premium = FALSE,
                premium_until = NULL,
                subscription_status = 'cancelled'
            WHERE email = $1
        `, [email]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        res.json({
            success: true,
            message: "Pro отключён",
            user: email
        });
    } catch (error) {
        console.error("Revoke Pro error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
});

app.get("/api/me", async (req, res) => {
    try {
        const email = String(req.query.email || "").trim().toLowerCase();

        if (!email) {
            return res.status(401).json({ error: "Пользователь не указан" });
        }

        const user = await db.one(`
            SELECT id, email, premium, premium_until, subscription_status
            FROM users
            WHERE email = $1
        `, [email]);

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        await refreshPremiumStatus(user);
        res.json(publicUser(user));
    } catch (error) {
        console.error("/api/me error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
});

app.get("/api/premium/status", async (req, res) => {
    try {
        const email = String(req.query.email || "").trim().toLowerCase();

        if (!email) {
            return res.status(400).json({ error: "Email не указан" });
        }

        const user = await db.one(`
            SELECT id, email, premium, premium_until, subscription_status
            FROM users
            WHERE email = $1
        `, [email]);

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        await refreshPremiumStatus(user);

        res.json({
            premium: Boolean(user.premium),
            premiumUntil: user.premium_until,
            subscriptionStatus: user.subscription_status
        });
    } catch (error) {
        console.error("Premium status error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
});

app.post("/api/tests/daily-access", async (req, res) => {
    try {
        const email = String(req.body?.email || "").trim().toLowerCase();
        const testId = String(req.body?.testId || "").trim();

        if (!email || !email.includes("@")) {
            return res.status(400).json({ error: "Нужен корректный email" });
        }

        if (!testId) {
            return res.status(400).json({ error: "testId не указан" });
        }

        const user = await db.one(`
            SELECT id, email, premium, premium_until, subscription_status
            FROM users
            WHERE email = $1
        `, [email]);

        if (!user) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }

        await refreshPremiumStatus(user);

        if (user.premium) {
            return res.json({
                allowed: true,
                premium: true,
                usageDate: getTashkentDate()
            });
        }

        const usageDate = getTashkentDate();

        const result = await db.query(`
            INSERT INTO daily_test_usage
                (user_id, usage_date, test_id, created_at)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (user_id, usage_date) DO NOTHING
        `, [user.id, usageDate, testId, Date.now()]);

        if (result.rowCount === 0) {
            const usage = await db.one(`
                SELECT test_id
                FROM daily_test_usage
                WHERE user_id = $1 AND usage_date = $2
            `, [user.id, usageDate]);

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
    } catch (error) {
        console.error("Daily access error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
});

app.get("/api/admin/users-count", async (req, res) => {
    try {
        const result = await db.one("SELECT COUNT(*)::int AS count FROM users");
        res.json({ users: result.count });
    } catch (error) {
        console.error("Users count error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
});

app.post("/api/auth/register", async (req, res) => {
    try {
        const email = String(req.body?.email || "").trim().toLowerCase();
        const password = String(req.body?.password || "");

        if (!email || !password) {
            return res.status(400).json({ error: "Введите email и пароль" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Пароль должен содержать минимум 6 символов" });
        }

        const existing = await db.one(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (existing) {
            return res.status(409).json({ error: "Пользователь с таким email уже существует" });
        }

        const user = await db.one(`
            INSERT INTO users (email, password_hash)
            VALUES ($1, $2)
            RETURNING id, email, premium
        `, [email, hashPassword(password)]);

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                premium: Boolean(user.premium)
            }
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
});

app.post("/api/auth/login", async (req, res) => {
    try {
        const email = String(req.body?.email || "").trim().toLowerCase();
        const password = String(req.body?.password || "");

        if (!email || !password) {
            return res.status(400).json({ error: "Введите email и пароль" });
        }

        const user = await db.one(`
            SELECT id, email, password_hash, premium, premium_until, subscription_status
            FROM users
            WHERE email = $1
        `, [email]);

        if (!user || user.password_hash !== hashPassword(password)) {
            return res.status(401).json({ error: "Неверный email или пароль" });
        }

        await refreshPremiumStatus(user);

        res.json({
            success: true,
            user: publicUser(user)
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
});

app.post("/api/payments/payme/create-order", async (req, res) => {
    try {
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

        let user = await db.one(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (!user) {
            const password = crypto.randomBytes(32).toString("hex");
            user = await db.one(`
                INSERT INTO users (email, password_hash)
                VALUES ($1, $2)
                RETURNING id
            `, [email, hashPassword(password)]);
        }

        const orderId = crypto.randomBytes(12).toString("hex");

        await db.query(`
            INSERT INTO premium_orders
                (order_id, user_id, email, amount, status, created_at)
            VALUES ($1, $2, $3, $4, 'pending', $5)
        `, [
            orderId,
            user.id,
            email,
            PREMIUM_AMOUNT_TIIYN,
            Date.now()
        ]);

        res.json({
            success: true,
            orderId,
            amount: PREMIUM_AMOUNT_TIIYN,
            merchant: PAYME_MERCHANT_ID,
            account: { order_id: orderId },
            checkoutUrl: "https://checkout.paycom.uz/"
        });
    } catch (error) {
        console.error("Create Payme order error:", error);
        res.status(500).json({ error: "Ошибка базы данных" });
    }
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
        const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
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

async function getOrder(account) {
    const orderId = String(account?.order_id || "").trim();

    if (!orderId) return null;

    return db.one(`
        SELECT *
        FROM premium_orders
        WHERE order_id = $1
    `, [orderId]);
}

async function activatePremium(order) {
    const user = await db.one(`
        SELECT premium_until
        FROM users
        WHERE id = $1
    `, [order.user_id]);

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

    await db.query(`
        UPDATE users
        SET premium = TRUE,
            premium_until = $1,
            subscription_status = 'active'
        WHERE id = $2
    `, [until, order.user_id]);

    await db.query(`
        UPDATE premium_orders
        SET status = 'paid', paid_at = $1
        WHERE order_id = $2
    `, [Date.now(), order.order_id]);

    return until;
}

async function handlePayme(req, res) {
    const method = req.body?.method;
    const params = req.body?.params || {};
    const id = req.body?.id ?? null;

    if (!isPaymeAuthorized(req)) {
        return res.json(
            paymeError(-32504, "Недостаточно привилегий для выполнения метода")
        );
    }

    try {
        if (method === "CheckPerformTransaction") {
            const order = await getOrder(params.account);

            if (!order) {
                return res.json(paymeError(-31050, "Заказ не найден", "account"));
            }

            if (Number(params.amount) !== Number(order.amount)) {
                return res.json(paymeError(-31001, "Неверная сумма"));
            }

            if (order.status !== "pending") {
                return res.json(paymeError(-31008, "Невозможно выполнить операцию"));
            }

            return res.json(paymeSuccess({ allow: true }, id));
        }

        if (method === "CreateTransaction") {
            const paymeId = String(params.id || "");
            const order = await getOrder(params.account);

            if (!order) {
                return res.json(paymeError(-31050, "Заказ не найден", "account"));
            }

            if (Number(params.amount) !== Number(order.amount)) {
                return res.json(paymeError(-31001, "Неверная сумма"));
            }

            const existing = await db.one(`
                SELECT *
                FROM payme_transactions
                WHERE payme_id = $1
            `, [paymeId]);

            if (existing) {
                return res.json(paymeSuccess({
                    create_time: Number(existing.create_time),
                    transaction: String(existing.id),
                    state: existing.state
                }, id));
            }

            if (order.status !== "pending") {
                return res.json(paymeError(-31008, "Невозможно выполнить операцию"));
            }

            const createTime = Number(params.time) || Date.now();

            const result = await db.one(`
                INSERT INTO payme_transactions
                    (payme_id, order_id, amount, state, create_time, created_at)
                VALUES ($1, $2, $3, 1, $4, $5)
                RETURNING id, state, create_time
            `, [
                paymeId,
                order.order_id,
                Number(params.amount),
                createTime,
                Date.now()
            ]);

            return res.json(paymeSuccess({
                create_time: Number(result.create_time),
                transaction: String(result.id),
                state: result.state
            }, id));
        }

        if (method === "PerformTransaction") {
            const tx = await db.one(`
                SELECT *
                FROM payme_transactions
                WHERE payme_id = $1
            `, [String(params.id || "")]);

            if (!tx) {
                return res.json(paymeError(-31003, "Транзакция не найдена"));
            }

            if (tx.state === 2) {
                return res.json(paymeSuccess({
                    transaction: String(tx.id),
                    perform_time: Number(tx.perform_time),
                    state: 2
                }, id));
            }

            if (tx.state !== 1) {
                return res.json(paymeError(-31008, "Невозможно выполнить операцию"));
            }

            const order = await db.one(`
                SELECT *
                FROM premium_orders
                WHERE order_id = $1
            `, [tx.order_id]);

            if (!order || order.status !== "pending") {
                return res.json(paymeError(-31008, "Невозможно выполнить операцию"));
            }

            const performTime = Date.now();

            await db.query(`
                UPDATE payme_transactions
                SET state = 2,
                    perform_time = $1
                WHERE payme_id = $2
            `, [performTime, tx.payme_id]);

            await activatePremium(order);

            return res.json(paymeSuccess({
                transaction: String(tx.id),
                perform_time: performTime,
                state: 2
            }, id));
        }

        if (method === "CancelTransaction") {
            const tx = await db.one(`
                SELECT *
                FROM payme_transactions
                WHERE payme_id = $1
            `, [String(params.id || "")]);

            if (!tx) {
                return res.json(paymeError(-31003, "Транзакция не найдена"));
            }

            if (tx.state === -1 || tx.state === -2) {
                return res.json(paymeSuccess({
                    transaction: String(tx.id),
                    cancel_time: Number(tx.cancel_time),
                    state: tx.state
                }, id));
            }

            const reason = Number(params.reason) || 10;

            if (tx.state === 2 && reason !== 5) {
                return res.json(paymeError(
                    -31007,
                    "Заказ выполнен. Невозможно отменить транзакцию"
                ));
            }

            const cancelTime = Date.now();
            const state = tx.state === 2 ? -2 : -1;

            await db.query(`
                UPDATE payme_transactions
                SET state = $1,
                    cancel_time = $2,
                    reason = $3
                WHERE payme_id = $4
            `, [state, cancelTime, reason, tx.payme_id]);

            await db.query(`
                UPDATE premium_orders
                SET status = 'cancelled'
                WHERE order_id = $1
            `, [tx.order_id]);

            if (tx.state === 2) {
                const order = await db.one(`
                    SELECT user_id
                    FROM premium_orders
                    WHERE order_id = $1
                `, [tx.order_id]);

                if (order) {
                    await db.query(`
                        UPDATE users
                        SET premium = FALSE,
                            premium_until = NULL,
                            subscription_status = 'cancelled'
                        WHERE id = $1
                    `, [order.user_id]);
                }
            }

            return res.json(paymeSuccess({
                transaction: String(tx.id),
                cancel_time: cancelTime,
                state
            }, id));
        }

        if (method === "CheckTransaction") {
            const tx = await db.one(`
                SELECT *
                FROM payme_transactions
                WHERE payme_id = $1
            `, [String(params.id || "")]);

            if (!tx) {
                return res.json(paymeError(-31003, "Транзакция не найдена"));
            }

            return res.json(paymeSuccess({
                create_time: Number(tx.create_time),
                perform_time: Number(tx.perform_time || 0),
                cancel_time: Number(tx.cancel_time || 0),
                transaction: String(tx.id),
                state: tx.state,
                reason: tx.reason ?? null
            }, id));
        }

        if (method === "GetStatement") {
            const from = Number(params.from);
            const to = Number(params.to);

            const result = await db.query(`
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
                WHERE t.create_time >= $1
                  AND t.create_time <= $2
                ORDER BY t.create_time ASC
            `, [from, to]);

            return res.json(paymeSuccess({
                transactions: result.rows.map(r => ({
                    id: r.id,
                    time: Number(r.time),
                    amount: Number(r.amount),
                    account: { order_id: r.order_id },
                    create_time: Number(r.create_time),
                    perform_time: Number(r.perform_time || 0),
                    cancel_time: Number(r.cancel_time || 0),
                    transaction: String(r.local_id),
                    state: r.state,
                    reason: r.reason ?? null
                }))
            }, id));
        }

        return res.json(paymeError(-32601, "Метод не найден"));
    } catch (error) {
        console.error("Payme Merchant API error:", error);
        return res.json(paymeError(-32400, "Системная ошибка"));
    }
}

app.post("/payme", handlePayme);
app.post("/payme/", handlePayme);

db.init()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Netija Premium server запущен на порту ${PORT}`);
            console.log("Database: Neon PostgreSQL");
        });
    })
    .catch(error => {
        console.error("Database initialization failed:", error);
        process.exit(1);
    });
