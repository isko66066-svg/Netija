const Database = require("better-sqlite3");

const db = new Database("netija.db");

// Таблица пользователей
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,

        premium INTEGER DEFAULT 0,
        premium_until TEXT,

        payme_token TEXT,
        subscription_status TEXT DEFAULT 'inactive',

        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
`);

module.exports = db;