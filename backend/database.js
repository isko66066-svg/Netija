const { Pool } = require("@neondatabase/serverless");

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL не настроен на сервере");
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000
});

async function query(text, params = []) {
    return pool.query(text, params);
}

async function one(text, params = []) {
    const result = await query(text, params);
    return result.rows[0] || null;
}

async function init() {
    await query(`
        CREATE TABLE IF NOT EXISTS users (
            id BIGSERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            premium BOOLEAN NOT NULL DEFAULT FALSE,
            premium_until TIMESTAMPTZ,
            payme_token TEXT,
            subscription_status TEXT NOT NULL DEFAULT 'inactive',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS daily_test_usage (
            id BIGSERIAL PRIMARY KEY,
            user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            usage_date DATE NOT NULL,
            test_id TEXT NOT NULL,
            created_at BIGINT NOT NULL,
            UNIQUE(user_id, usage_date)
        );

        CREATE TABLE IF NOT EXISTS premium_orders (
            id BIGSERIAL PRIMARY KEY,
            order_id TEXT UNIQUE NOT NULL,
            user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
            email TEXT NOT NULL,
            amount BIGINT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at BIGINT NOT NULL,
            paid_at BIGINT
        );

        CREATE TABLE IF NOT EXISTS payme_transactions (
            id BIGSERIAL PRIMARY KEY,
            payme_id TEXT UNIQUE NOT NULL,
            order_id TEXT NOT NULL REFERENCES premium_orders(order_id) ON DELETE RESTRICT,
            amount BIGINT NOT NULL,
            state INTEGER NOT NULL DEFAULT 1,
            create_time BIGINT NOT NULL,
            perform_time BIGINT NOT NULL DEFAULT 0,
            cancel_time BIGINT NOT NULL DEFAULT 0,
            reason INTEGER,
            created_at BIGINT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_premium_orders_email
            ON premium_orders(email);

        CREATE INDEX IF NOT EXISTS idx_payme_transactions_order
            ON payme_transactions(order_id);

        CREATE INDEX IF NOT EXISTS idx_daily_test_usage_user_date
            ON daily_test_usage(user_id, usage_date);
    `);
}

module.exports = {
    query,
    one,
    init,
    pool
};
