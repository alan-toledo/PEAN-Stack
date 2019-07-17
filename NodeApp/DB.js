const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
})
pool.query('CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, user_name VARCHAR(40) not null)', (err, res) => {
    pool.end();
})