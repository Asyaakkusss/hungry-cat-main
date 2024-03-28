const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tomato paws',
    password: '7vT@g3H!R2^',
    port: 5433, 
});
module.exports = pool;
