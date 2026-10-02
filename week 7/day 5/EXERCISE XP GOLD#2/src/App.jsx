import BookForm from './Components/BookForm.jsx'
import UserForm from './Components/UserForm.jsx'

function App() {
  return (
    <main className="page-shell">
      <div className="exercise-grid">
        <section className="exercise-panel" aria-labelledby="book-heading">
          <div className="panel-heading">
            <span className="section-number">01</span>
            <div>
              <p className="eyebrow">STATE + FORM DATA</p>
              <h1 id="book-heading">Book submission</h1>
            </div>
          </div>
          <BookForm />
        </section>

        <section className="exercise-panel" aria-labelledby="user-heading">
          <div className="panel-heading">
            <span className="section-number">02</span>
            <div>
              <p className="eyebrow">VALIDATION + CONDITIONAL VIEW</p>
              <h2 id="user-heading">Contact details</h2>
            </div>
          </div>
          <UserForm />
        </section>
      </div>
    </main>
  )
}

export default App
