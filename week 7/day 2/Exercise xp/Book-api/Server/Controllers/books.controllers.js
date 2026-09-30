const booksModel = require('../models/books.model');

const getAllBooks = async (req, res, next) => {
  try {
    const books = await booksModel.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await booksModel.getBookById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
      return res.status(400).json({ message: 'Title, author, and publishedYear are required' });
    }

    const [newBook] = await booksModel.createBook(title, author, publishedYear);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};