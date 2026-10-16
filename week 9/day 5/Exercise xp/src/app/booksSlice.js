import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "The Haunting of Hill House", author: "Shirley Jackson", genre: "Horror" },
  { id: 2, title: "Mexican Gothic", author: "Silvia Moreno-Garcia", genre: "Horror" },
  { id: 3, title: "The Shining", author: "Stephen King", genre: "Horror" },
  { id: 4, title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", genre: "Fantasy" },
  { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy" },
  { id: 6, title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy" },
  { id: 7, title: "Dune", author: "Frank Herbert", genre: "Science Fiction" },
  { id: 8, title: "Kindred", author: "Octavia E. Butler", genre: "Science Fiction" },
  { id: 9, title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", genre: "Science Fiction" },
  { id: 10, title: "The Thursday Murder Club", author: "Richard Osman", genre: "Mystery" },
  { id: 11, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance" },
  { id: 12, title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", genre: "Nonfiction" },
];

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
});

export const selectBooks = (state) => state.books;

const selectBooksByGenre = (genre) =>
  createSelector([selectBooks], (books) => books.filter((book) => book.genre === genre));

export const selectHorrorBooks = selectBooksByGenre("Horror");
export const selectFantasyBooks = selectBooksByGenre("Fantasy");
export const selectScienceFictionBooks = selectBooksByGenre("Science Fiction");

export default booksSlice.reducer;
