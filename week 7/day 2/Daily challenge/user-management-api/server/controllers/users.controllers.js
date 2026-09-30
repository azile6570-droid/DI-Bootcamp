const bcrypt = require('bcrypt');
const usersModel = require('../models/users.model');

// POST /register
const register = async (req, res, next) => {
  try {
    const { username, password, email, first_name, last_name } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await usersModel.createUserTransaction(
      { username, email, first_name, last_name },
      hashedPassword
    );

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    next(error);
  }
};

// POST /login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashRecord = await usersModel.getHashedPasswordByUsername(username);

    if (!hashRecord) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, hashRecord.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', username });
  } catch (error) {
    next(error);
  }
};

// GET /users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET /users/:id
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersModel.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// PUT /users/:id
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name } = req.body;

    const [updatedUser] = await usersModel.updateUser(id, { email, first_name, last_name });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
};