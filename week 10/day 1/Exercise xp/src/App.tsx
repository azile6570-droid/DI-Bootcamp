import { useState } from 'react'
import Counter from './components/Counter'
import Greeting from './components/Greeting'
import UserCard from './components/UserCard'
import UserList from './components/UserList'
import './App.css'

const exercises = [
  { number: '01', label: 'Vite + React' },
  { number: '02', label: 'Typed props' },
  { number: '03', label: 'useState' },
  { number: '04', label: 'Optional props' },
  { number: '05', label: 'useEffect + API' },
]

function App() {
  const [activeExercise, setActiveExercise] = useState('01')

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="TypeScript lab home">
          <span className="brand-mark">T</span>
          <span className="brand-name">type<span>lab</span></span>
        </a>

        <div className="sidebar-label">YOUR WORKSPACE</div>
        <nav className="exercise-nav" aria-label="Exercises">
          {exercises.map((exercise) => (
            <a
              className={`nav-link${activeExercise === exercise.number ? ' is-active' : ''}`}
              href={`#exercise-${exercise.number}`}
              key={exercise.number}
              onClick={() => setActiveExercise(exercise.number)}
            >
              <span className="nav-number">{exercise.number}</span>
              {exercise.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="note-indicator" />
          <span>All caught up</span>
        </div>
      </aside>

      <div className="main-panel" id="home">
        <header className="topbar">
          <div className="breadcrumb">Week 10 <span>/</span> Day 1</div>
          <div className="topbar-status"><span /> React + TypeScript</div>
        </header>

        <div className="page-content">
          <section className="welcome">
            <div className="eyebrow"><span className="eyebrow-line" /> THE COMPONENT PLAYGROUND</div>
            <h1>Small steps.<br /><span>Strong types.</span></h1>
            <p className="welcome-copy">
              Five hands-on exercises to make React and TypeScript feel like second nature.
              Pick a component, explore the code, and see your changes come to life.
            </p>
            <div className="welcome-tags">
              <span className="tag"><span className="tag-dot react-dot" /> React</span>
              <span className="tag"><span className="tag-dot ts-dot" /> TypeScript</span>
              <span className="tag"><span className="tag-dot vite-dot" /> Vite</span>
              <span className="tag time-tag">~ 80 min</span>
            </div>
          </section>

          <div className="section-heading">
            <div>
              <div className="eyebrow">LEARN BY DOING</div>
              <h2>Your exercises</h2>
            </div>
            <div className="exercise-count"><span>05</span> EXERCISES</div>
          </div>

          <div className="exercise-grid">
            <section className="exercise-card setup-card" id="exercise-01">
              <div className="card-topline">
                <span className="card-index">01 <span>/ 05</span></span>
                <span className="card-time">10 MIN</span>
              </div>
              <div className="card-icon vite-icon" aria-hidden="true">V</div>
              <h3>The starting point</h3>
              <p className="card-description">A React + TypeScript project, powered by Vite and ready to go.</p>
              <div className="setup-preview">
                <div className="preview-dots"><i /><i /><i /><span>src/main.tsx</span></div>
                <code><span className="syntax-purple">createRoot</span>(document.<span className="syntax-green">getElementById</span>(<span className="syntax-orange">'root'</span>)!)</code>
              </div>
              <div className="card-footer"><span className="check-icon">✓</span> PROJECT READY</div>
            </section>

            <section className="exercise-card" id="exercise-02">
              <div className="card-topline">
                <span className="card-index">02 <span>/ 05</span></span>
                <span className="card-time">15 MIN</span>
              </div>
              <div className="card-icon greeting-icon" aria-hidden="true">Aa</div>
              <h3>Props with purpose</h3>
              <p className="card-description">Give a component a name and something to say.</p>
              <div className="component-preview">
                <Greeting name="Alex" messageCount={3} />
              </div>
              <div className="card-footer"><span className="type-label">INTERFACE</span> GreetingProps</div>
            </section>

            <section className="exercise-card" id="exercise-03">
              <div className="card-topline">
                <span className="card-index">03 <span>/ 05</span></span>
                <span className="card-time">20 MIN</span>
              </div>
              <div className="card-icon counter-icon" aria-hidden="true">±</div>
              <h3>State in motion</h3>
              <p className="card-description">Typed state, two directions, and a record of your last move.</p>
              <div className="component-preview counter-preview">
                <Counter />
              </div>
              <div className="card-footer"><span className="type-label">HOOK</span> useState&lt;number&gt;</div>
            </section>

            <section className="exercise-card" id="exercise-04">
              <div className="card-topline">
                <span className="card-index">04 <span>/ 05</span></span>
                <span className="card-time">15 MIN</span>
              </div>
              <div className="card-icon user-icon" aria-hidden="true">U</div>
              <h3>Room for optional</h3>
              <p className="card-description">Not every user has all the details. Make room for that.</p>
              <div className="component-preview user-preview">
                <UserCard name="Sam Rivera" age={28} role="Designer" />
              </div>
              <div className="card-footer"><span className="type-label">OPTIONAL</span> name · age · role</div>
            </section>

            <section className="exercise-card users-card" id="exercise-05">
              <div className="card-topline">
                <span className="card-index">05 <span>/ 05</span></span>
                <span className="card-time">20 MIN</span>
              </div>
              <div className="card-icon api-icon" aria-hidden="true">{ }</div>
              <h3>Fetch, meet, render</h3>
              <p className="card-description">Load real users with useEffect. Loading, error, and data—all typed.</p>
              <div className="users-preview">
                <UserList />
              </div>
              <div className="card-footer"><span className="type-label">FETCHING FROM</span> jsonplaceholder.typicode.com</div>
            </section>
          </div>

          <footer className="page-footer">
            <span>BUILT ONE COMPONENT AT A TIME</span>
            <span>WEEK 10 <span className="footer-separator">·</span> DAY 1</span>
          </footer>
        </div>
      </div>
    </main>
  )
}

export default App
