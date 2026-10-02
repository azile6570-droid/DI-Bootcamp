import Forms from './Components/Forms.jsx'

function App() {
  return (
    <main className="page-shell">
      <section className="exercise-section" aria-labelledby="forms-heading">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div>
            <p className="eyebrow">CONTROLLED INPUTS</p>
            <h1 id="forms-heading">Forms</h1>
          </div>
        </div>
        <Forms />
      </section>
    </main>
  )
}

export default App
