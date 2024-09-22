const pool = require("../config/db");

// Create a new user
const createUser = async (name, email, hashedPassword) => {
    if (typeof hashedPassword !== 'string') {
        throw new Error('Hashed password must be a string');
    }

    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
    );
    return result.rows[0];
};

// Find a user by email
const findUserByEmail = async (email) => {
    if (typeof email !== 'string') {
        throw new Error('Email must be a string');
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

// Get all users
const getUsers = async () => {
    const result = await pool.query('SELECT id, name, email, last_login, registration_time, status FROM users');
    return result.rows;
};

// Update user status
const updateUserStatus = async (id, status) => {
    await pool.query('UPDATE users SET status = $1 WHERE id = $2', [status, id]);
};

// Delete a user by ID
const deleteUserById = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};

module.exports = {
    createUser,
    findUserByEmail,
    getUsers,
    updateUserStatus,
    deleteUserById
};
