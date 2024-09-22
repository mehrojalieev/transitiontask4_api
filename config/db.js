const { Pool } = require("pg");
require('dotenv').config(); // Load environment variables

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL, // Ensure this is correctly set
});

pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error:', err));

module.exports = pool;
