import Car from './Components/Car.js'
import Events from './Components/Events.js'
import Phone from './Components/Phone.js'
import Color from './Components/Color.js'

const carinfo = { name: 'Ford', model: 'Mustang' }

function App() {
  return (
    <main className="page-shell">
      <div className="exercise-list">
        <section className="exercise-section" aria-labelledby="car-heading">
          <div className="section-heading">
            <span className="section-number">01</span>
            <div>
              <p className="eyebrow">COMPONENTS + STATE</p>
              <h1 id="car-heading">Car and Garage</h1>
            </div>
          </div>
          <Car carInfo={carinfo} />
        </section>

        <section className="exercise-section" aria-labelledby="events-heading">
          <div className="section-heading">
            <span className="section-number">02</span>
            <div>
              <p className="eyebrow">EVENT HANDLERS</p>
              <h2 id="events-heading">Events</h2>
            </div>
          </div>
          <Events />
        </section>

        <section className="exercise-section" aria-labelledby="phone-heading">
          <div className="section-heading">
            <span className="section-number">03</span>
            <div>
              <p className="eyebrow">COMPONENTS + STATE</p>
              <h2 id="phone-heading">Phone</h2>
            </div>
          </div>
          <Phone />
        </section>

        <section className="exercise-section" aria-labelledby="color-heading">
          <div className="section-heading">
            <span className="section-number">04</span>
            <div>
              <p className="eyebrow">REACT LIFECYCLE</p>
              <h2 id="color-heading">useEffect</h2>
            </div>
          </div>
          <Color />
        </section>
      </div>
    </main>
  )
}

export default App
