const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const router = express.Router();
const USERS_FILE = path.join(__dirname, 'users.json');

// Helper functions for reading/writing JSON
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(USERS_FILE, JSON.stringify([]));
      return [];
    }
    throw error;
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// POST /register - Register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { name, lastName, email, username, password } = req.body;

    if (!name || !lastName || !email || !username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const users = await readUsers();

    // Check if username already exists
    const existingUsername = users.find((u) => u.username === username);
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if password or hashed match already exists across existing users
    for (const u of users) {
      const isMatch = await bcrypt.compare(password, u.password);
      if (isMatch) {
        return res.status(400).json({ message: 'Username or password already exist' });
      }
    }

    // Hash password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      name,
      lastName,
      email,
      username,
      password: hashedPassword
    };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({ message: 'Hello Your account is created' });
  } catch (error) {
    next(error);
  }
});

// POST /login - User authentication
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const users = await readUsers();
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(404).json({ message: 'Username is not registered' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: `Hi ${user.username} welcome back` });
  } catch (error) {
    next(error);
  }
});

// GET /users - Retrieve all users
router.get('/users', async (req, res, next) => {
  try {
    const users = await readUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /users/:id - Retrieve specific user
router.get('/users/:id', async (req, res, next) => {
  try {
    const users = await readUsers();
    const user = users.find((u) => u.id === req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// PUT /users/:id - Update user details
router.put('/users/:id', async (req, res, next) => {
  try {
    const { name, lastName, email, username } = req.body;
    const users = await readUsers();
    const index = users.findIndex((u) => u.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users[index] = {
      ...users[index],
      name: name || users[index].name,
      lastName: lastName || users[index].lastName,
      email: email || users[index].email,
      username: username || users[index].username
    };

    await writeUsers(users);
    res.json({ message: 'User updated successfully', user: users[index] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;