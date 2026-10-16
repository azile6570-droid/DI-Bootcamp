import { useState } from "react";
import { useSelector } from "react-redux";
import BookList from "./components/BookList.jsx";
import {
  selectBooks,
  selectFantasyBooks,
  selectHorrorBooks,
  selectScienceFictionBooks,
} from "./app/booksSlice.js";

const filters = [
  { label: "All books", value: "all" },
  { label: "Horror", value: "horror", selector: selectHorrorBooks },
  { label: "Fantasy", value: "fantasy", selector: selectFantasyBooks },
  { label: "Science fiction", value: "science-fiction", selector: selectScienceFictionBooks },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const books = useSelector(
    filters.find((filter) => filter.value === activeFilter)?.selector ?? selectBooks,
  );

  return (
    <main className="page-shell">
      <section className="inventory" aria-labelledby="page-title">
        <header className="page-header">
          <div className="brand-mark" aria-hidden="true">QC</div>
          <div className="header-copy">
            <p className="eyebrow">A little corner for readers</p>
            <h1 id="page-title">Quiet Chapters</h1>
            <p className="intro">Browse the shelves and find your next story.</p>
          </div>
          <div className="book-count" aria-live="polite">
            <span className="count-number">{books.length}</span>
            <span className="count-label">{books.length === 1 ? "book" : "books"}</span>
          </div>
        </header>

        <nav className="genre-nav" aria-label="Filter books by genre">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={activeFilter === filter.value ? "genre-button active" : "genre-button"}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        <BookList books={books} />
        <footer className="page-footer">
          <span>Curated for a slower kind of afternoon.</span>
          <span>{activeFilter === "all" ? "Complete collection" : `Browsing ${filters.find((filter) => filter.value === activeFilter)?.label}`}</span>
        </footer>
      </section>
    </main>
  );
}
