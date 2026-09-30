const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos.controller');

router.get('/todos', todosController.getAllTodos);
router.get('/todos/:id', todosController.getTodoById);
router.post('/todos', todosController.createTodo);
router.put('/todos/:id', todosController.updateTodo);
router.delete('/todos/:id', todosController.deleteTodo);

module.exports = router;