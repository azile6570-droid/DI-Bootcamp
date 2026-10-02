import { useState } from 'react'

const emptyBook = {
  title: '',
  author: '',
  genre: '',
  year: '',
}

function BookForm() {
  const [book, setBook] = useState(emptyBook)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setBook((currentBook) => ({ ...currentBook, [name]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(book)
    setSubmitted(true)
  }

  return (
    <div className="form-content">
      <form className="form-fields" onSubmit={handleSubmit}>
        <label className="field">
          <span>Book title</span>
          <input name="title" value={book.title} onChange={handleChange} required />
        </label>
        <label className="field">
          <span>Author</span>
          <input name="author" value={book.author} onChange={handleChange} required />
        </label>
        <label className="field">
          <span>Genre</span>
          <select name="genre" value={book.genre} onChange={handleChange} required>
            <option value="" disabled>Select a genre</option>
            <option>Fiction</option>
            <option>Non-fiction</option>
            <option>Fantasy</option>
            <option>Mystery</option>
            <option>Science fiction</option>
          </select>
        </label>
        <label className="field">
          <span>Year</span>
          <input name="year" type="number" min="1" max="9999" value={book.year} onChange={handleChange} required />
        </label>
        <button className="button button-dark" type="submit">Submit book</button>
      </form>
      {submitted && (
        <p className="success-message" role="status">Book information submitted successfully.</p>
      )}
    </div>
  )
}

export default BookForm
