// EXERCISE 1

const express = require('express');
const axios = require('axios');

const app1 = express();
const PORT1 = 5000;
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

app1.use(express.json());

app1.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts', message: error.message });
  }
});

app1.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_URL}/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Post not found', message: error.message });
  }
});

app1.post('/api/posts', async (req, res) => {
  try {
    const response = await axios.post(API_URL, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', message: error.message });
  }
});

app1.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.put(`${API_URL}/${id}`, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post', message: error.message });
  }
});

app1.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await axios.delete(`${API_URL}/${id}`);
    res.status(200).json({ message: `Post with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post', message: error.message });
  }
});

app1.listen(PORT1, () => {
  console.log(`CRUD API Intermediate server running on http://localhost:${PORT1}`);
});


// EXERCISE 2
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app2 = express();
const PORT2 = 5001; 
const JWT_SECRET = 'your_jwt_secret_key';

app2.use(express.json());

const users = [];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

app2.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      role: role || 'user'
    };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error registering user' });
  }
});

app2.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

app2.get('/api/profile', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Profile accessed successfully', user: req.user });
});

app2.listen(PORT2, () => {
  console.log(`User Login System running on http://localhost:${PORT2}`);
});


// EXERCISE 3
const app3 = express();
const PORT3 = 5002;

app3.use(express.json());

let todos = [
  { id: 1, title: 'Learn Express.js', completed: true },
  { id: 2, title: 'Build a REST API', completed: false }
];

app3.get('/api/todos', (req, res) => {
  res.status(200).json(todos);
});

app3.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(todo);
});

app3.post('/api/todos', (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: typeof completed === 'boolean' ? completed : false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app3.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.status(200).json(todo);
});

app3.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const deletedTodo = todos.splice(index, 1);
  res.status(200).json({ message: 'Todo deleted successfully', todo: deletedTodo[0] });
});

app3.listen(PORT3, () => {
  console.log(`Todo API running on http://localhost:${PORT3}`);
});
