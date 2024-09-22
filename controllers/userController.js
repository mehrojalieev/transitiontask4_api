const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, getUsers, updateUserStatus, deleteUserById } = require('../models/userModel');

const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';

// Register user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(name, email, hashedPassword);
  res.status(201).json({ message: 'User registered successfully', user });
}; 

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
  res.json({ token, userId: user.id });
};

// Get all users
const getAllUsers = async (req, res) => {
  const users = await getUsers();
  res.json(users);
};

// Update user status
const changeUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await updateUserStatus(Number(id), status);
  res.json({ message: 'User status updated' });
};

// Delete user
const removeUser = async (req, res) => {
  const { id } = req.params;
  await deleteUserById(Number(id));
  res.json({ message: 'User deleted' });
};

module.exports = {
  register,
  login,
  getAllUsers,
  changeUserStatus,
  removeUser
};
