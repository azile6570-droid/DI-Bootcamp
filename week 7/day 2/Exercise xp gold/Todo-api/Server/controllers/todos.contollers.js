const todosModel = require('../models/todos.model');

// GET /api/todos
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await todosModel.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// GET /api/todos/:id
const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await todosModel.getTodoById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// POST /api/todos
const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const [newTodo] = await todosModel.createTodo(title);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// PUT /api/todos/:id
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    if (title === undefined || completed === undefined) {
      return res.status(400).json({ message: 'Title and completed status are required' });
    }

    const [updatedTodo] = await todosModel.updateTodo(id, title, completed);

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/todos/:id
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await todosModel.deleteTodo(id);

    if (!deletedCount) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};