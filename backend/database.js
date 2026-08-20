const Database = require("better-sqlite3");

const db = new Database("netija.db");

db.pragma("journal_mode = WAL");

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

// Дневной лимит бесплатных тестов.
// Одна запись = пользователь уже использовал бесплатный тест в конкретную дату.
db.exec(`
    CREATE TABLE IF NOT EXISTS daily_test_usage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        usage_date TEXT NOT NULL,
        test_id TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        UNIQUE(user_id, usage_date),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`);

// Заказы Premium. order_id используется как account[order_id] в Payme.
db.exec(`
    CREATE TABLE IF NOT EXISTS premium_orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT UNIQUE NOT NULL,
        user_id INTEGER,
        email TEXT NOT NULL,
        amount INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at INTEGER NOT NULL,
        paid_at INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`);

// Транзакции Payme Merchant API.
db.exec(`
    CREATE TABLE IF NOT EXISTS payme_transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        payme_id TEXT UNIQUE NOT NULL,
        order_id TEXT NOT NULL,
        amount INTEGER NOT NULL,
        state INTEGER NOT NULL DEFAULT 1,
        create_time INTEGER NOT NULL,
        perform_time INTEGER DEFAULT 0,
        cancel_time INTEGER DEFAULT 0,
        reason INTEGER,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES premium_orders(order_id)
    );
`);

CREATE_INDEXES();

function CREATE_INDEXES() {
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_premium_orders_email
        ON premium_orders(email);

        CREATE INDEX IF NOT EXISTS idx_payme_transactions_order
        ON payme_transactions(order_id);

        CREATE INDEX IF NOT EXISTS idx_daily_test_usage_user_date
        ON daily_test_usage(user_id, usage_date);
    `);
}

module.exports = db;
