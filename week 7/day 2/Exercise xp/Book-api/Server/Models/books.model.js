const db = require('../config/db');

const getAllBooks = () => {
  return db('books').select('*');
};

const getBookById = (id) => {
  return db('books').where({ id }).first();
};

const createBook = (title, author, publishedYear) => {
  return db('books').insert({ title, author, publishedYear }).returning('*');
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
};