const db = require('../config/db');

const getAllTodos = () => {
  return db('tasks').select('*');
};

const getTodoById = (id) => {
  return db('tasks').where({ id }).first();
};

const createTodo = (title) => {
  return db('tasks')
    .insert({ title, completed: false })
    .returning('*');
};

const updateTodo = (id, title, completed) => {
  return db('tasks')
    .where({ id })
    .update({ title, completed })
    .returning('*');
};

const deleteTodo = (id) => {
  return db('tasks').where({ id }).del();
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};