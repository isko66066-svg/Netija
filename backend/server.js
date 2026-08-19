const express = require("express");
const cors = require("cors");
const db = require("./database");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/*
 * Проверка работы сервера
 */
app.get("/api/health", (req, res) => {
    res.json({
        ok: true,
        message: "Netija Premium server работает"
    });
});

/*
 * Проверка Premium пользователя
 */
app.get("/api/premium/status", (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({
            error: "Email не указан"
        });
    }

    const user = db.prepare(`
        SELECT
            id,
            email,
            premium,
            premium_until,
            subscription_status
        FROM users
        WHERE email = ?
    `).get(email);

    if (!user) {
        return res.status(404).json({
            error: "Пользователь не найден"
        });
    }

    res.json({
        premium: Boolean(user.premium),
        premiumUntil: user.premium_until,
        subscriptionStatus: user.subscription_status
    });
});

/*
 * Получение количества пользователей
 * Нужно только для проверки базы на этапе разработки.
 */
app.get("/api/admin/users-count", (req, res) => {
    const result = db
        .prepare("SELECT COUNT(*) AS count FROM users")
        .get();

    res.json({
        users: result.count
    });
});

/*
 * Создание хэша пароля
 */
function hashPassword(password) {
    return crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
}

/*
 * Регистрация
 */
app.post("/api/auth/register", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Введите email и пароль"
        });
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
        INSERT INTO users (
            email,
            password_hash
        )
        VALUES (?, ?)
    `).run(
        normalizedEmail,
        passwordHash
    );

    res.json({
        success: true,
        user: {
            id: result.lastInsertRowid,
            email: normalizedEmail,
            premium: false
        }
    });
});

/*
 * Вход
 */
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Введите email и пароль"
        });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const passwordHash = hashPassword(password);

    const user = db.prepare(`
        SELECT
            id,
            email,
            password_hash,
            premium,
            premium_until,
            subscription_status
        FROM users
        WHERE email = ?
    `).get(normalizedEmail);

    if (!user || user.password_hash !== passwordHash) {
        return res.status(401).json({
            error: "Неверный email или пароль"
        });
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

app.listen(PORT, () => {
    console.log(
        `Netija Premium server запущен: http://localhost:${PORT}`
    );
});