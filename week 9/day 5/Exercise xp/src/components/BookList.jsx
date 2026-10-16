export default function BookList({ books }) {
  return (
    <section className="shelf" aria-label="Book inventory" aria-live="polite">
      {books.length > 0 ? (
        <ul className="book-grid">
          {books.map((book, index) => (
            <li className="book-card" key={book.id}>
              <div className={`book-cover cover-${(index % 4) + 1}`} aria-hidden="true">
                <span className="cover-initial">{book.title.charAt(0)}</span>
                <span className="cover-rule" />
                <span className="cover-genre">{book.genre}</span>
              </div>
              <div className="book-details">
                <p className="book-genre">{book.genre}</p>
                <h2>{book.title}</h2>
                <p className="book-author">by {book.author}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">There are no books in this genre yet.</p>
      )}
    </section>
  );
}
