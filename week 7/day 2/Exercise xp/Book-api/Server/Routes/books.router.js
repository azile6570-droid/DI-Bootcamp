const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

router.get('/books', booksController.getAllBooks);
router.get('/books/:bookId', booksController.getBookById);
router.post('/books', booksController.createBook);

module.exports = router;