const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Helper function to read tasks safely
async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(TASKS_FILE, JSON.stringify([]));
      return [];
    }
    throw new Error('Failed to read database file');
  }
}

// Helper function to write tasks safely
async function writeTasks(tasks) {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    throw new Error('Failed to write to database file');
  }
}

// GET /tasks - Retrieve all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// GET /tasks/:id - Retrieve a task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

// POST /tasks - Create a new task
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }

    const tasks = await readTasks();

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description ? String(description).trim() : '',
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

// PUT /tasks/:id - Update a task by ID
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const tasks = await readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validation
    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed must be a boolean value' });
    }

    // Update fields if provided
    tasks[index] = {
      ...tasks[index],
      title: title !== undefined ? title.trim() : tasks[index].title,
      description: description !== undefined ? String(description).trim() : tasks[index].description,
      completed: completed !== undefined ? completed : tasks[index].completed,
      updatedAt: new Date().toISOString()
    };

    await writeTasks(tasks);

    res.json(tasks[index]);
  } catch (error) {
    next(error);
  }
});

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(index, 1)[0];
    await writeTasks(tasks);

    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    next(error);
  }
});

module.exports = router;