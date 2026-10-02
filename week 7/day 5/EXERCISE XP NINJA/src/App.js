import Clock from './Components/Clock.js'
import Form from './Components/Form.js'

function App() {
  return (
    <main className="page-shell">
      <section className="clock-panel" aria-labelledby="clock-heading">
        <div>
          <p className="eyebrow">LOCAL TIME</p>
          <h1 id="clock-heading">Live clock</h1>
        </div>
        <Clock />
      </section>

      <section className="form-section" aria-labelledby="form-heading">
        <div className="section-heading">
          <span className="section-number">01</span>
          <div>
            <p className="eyebrow">CUSTOM VALIDATION</p>
            <h2 id="form-heading">Your details</h2>
          </div>
        </div>
        <Form />
      </section>
    </main>
  )
}

export default App
