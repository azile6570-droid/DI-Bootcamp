import { useState, type FormEvent } from 'react'
import List from './List'
import type { Book } from './types'
import './App.css'

const starterBooks: Book[] = [
  { id: 'book-1', title: 'The Creative Act', author: 'Rick Rubin' },
  { id: 'book-2', title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin' },
  { id: 'book-3', title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer' },
]

function App() {
  const [books, setBooks] = useState<Book[]>(starterBooks)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedAuthor = author.trim()
    if (!trimmedTitle || !trimmedAuthor) return

    const newBook: Book = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      author: trimmedAuthor,
    }

    setBooks((currentBooks) => [newBook, ...currentBooks])
    setTitle('')
    setAuthor('')
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Little Library home">
          <span className="wordmark-icon" aria-hidden="true">L</span>
          <span>little library</span>
        </a>
        <span className="topbar-note">A home for your next favorite</span>
      </header>

      <div className="content-grid" id="home">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow"><span className="eyebrow-star" aria-hidden="true">✳</span> YOUR PERSONAL READING NOOK</p>
          <h1 id="page-title">Stories worth<br /><em>keeping close.</em></h1>
          <p className="intro-copy">
            A little list of books to remember, revisit, and recommend. What are you reading?
          </p>
          <div className="book-count" aria-live="polite">
            <span className="count-number">{String(books.length).padStart(2, '0')}</span>
            <span className="count-label">{books.length === 1 ? 'book on your shelf' : 'books on your shelf'}</span>
          </div>
          <div className="decorative-books" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </div>
        </section>

        <section className="add-panel" aria-labelledby="add-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">GROW YOUR SHELF</p>
              <h2 id="add-title">Add a book</h2>
            </div>
            <span className="panel-sparkle" aria-hidden="true">✳</span>
          </div>
          <form className="book-form" onSubmit={addBook}>
            <label htmlFor="book-title">Book title</label>
            <input
              id="book-title"
              name="title"
              type="text"
              placeholder="e.g. The Midnight Library"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <label htmlFor="book-author">Author</label>
            <input
              id="book-author"
              name="author"
              type="text"
              placeholder="e.g. Matt Haig"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
            />
            <button type="submit">
              <span aria-hidden="true">+</span> Add to my list
            </button>
          </form>
          <p className="form-note"><span aria-hidden="true">↳</span> Good books are even better when remembered.</p>
        </section>

        <section className="shelf" aria-labelledby="shelf-title">
          <div className="shelf-heading">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2 id="shelf-title">On your shelf</h2>
            </div>
            <span className="shelf-sort">RECENTLY ADDED <span aria-hidden="true">↓</span></span>
          </div>
          {books.length > 0 ? (
            <List
              items={books}
              keyExtractor={(book) => book.id}
              renderItem={(book, index) => (
                <article className="book-card">
                  <div className={`book-cover cover-${index % 4}`} aria-hidden="true">
                    <span className="cover-mark">✳</span>
                    <span className="cover-initials">
                      {book.title.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()}
                    </span>
                    <span className="cover-spine" />
                  </div>
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                  </div>
                  <span className="book-number">{String(index + 1).padStart(2, '0')}</span>
                </article>
              )}
            />
          ) : (
            <div className="empty-state">
              <span aria-hidden="true">✳</span>
              <p>Your shelf is waiting for its first story.</p>
            </div>
          )}
        </section>
      </div>

      <footer className="page-footer">
        <span>MADE FOR THE LOVE OF READING</span>
        <span>WEEK 10 <i>·</i> DAY 1</span>
      </footer>
    </main>
  )
}

export default App
