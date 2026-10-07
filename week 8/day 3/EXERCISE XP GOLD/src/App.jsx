import { createContext, useContext, useRef, useState } from "react";

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === "light" ? "☾" : "☀"}
      </span>
      Switch to {nextTheme} mode
    </button>
  );
}

function ThemeDemo() {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="demo-card theme-demo">
      <div className="card-heading">
        <span className="card-icon" aria-hidden="true">◐</span>
        <div>
          <p className="eyebrow">EXERCISE 01 · useContext</p>
          <h2>Theme switcher</h2>
        </div>
      </div>
      <p className="card-description">
        Share the current theme across components with React context.
      </p>
      <div className={`theme-preview ${theme}`} aria-live="polite">
        <div>
          <span className="preview-label">CURRENT THEME</span>
          <p className="preview-theme">{theme}</p>
        </div>
        <span className="preview-orb" aria-hidden="true">
          {theme === "light" ? "☀" : "☾"}
        </span>
      </div>
      <ThemeSwitcher />
    </section>
  );
}

function CharacterCounter() {
  const inputRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);

  function handleInput() {
    setCharacterCount(inputRef.current.value.length);
  }

  return (
    <section className="demo-card counter-demo">
      <div className="card-heading">
        <span className="card-icon counter-icon" aria-hidden="true">Aa</span>
        <div>
          <p className="eyebrow">EXERCISE 02 · useRef</p>
          <h2>Character counter</h2>
        </div>
      </div>
      <p className="card-description">
        Keep a reference to the input and count each character as you type.
      </p>
      <label className="input-label" htmlFor="message">
        Your message
      </label>
      <input
        ref={inputRef}
        id="message"
        className="message-input"
        type="text"
        placeholder="Start typing something..."
        onInput={handleInput}
      />
      <div className="counter-status" aria-live="polite">
        <span>Characters typed</span>
        <strong>{characterCount}</strong>
      </div>
      <div
        className="counter-track"
        role="progressbar"
        aria-label="Character count visualization"
        aria-valuenow={Math.min(characterCount, 40)}
        aria-valuemin="0"
        aria-valuemax="40"
      >
        <span style={{ width: `${Math.min(characterCount * 2.5, 100)}%` }} />
      </div>
    </section>
  );
}

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={`app-shell ${theme}`}>
      <div className="page-content">
        <header className="page-header">
          <span className="header-badge">REACT HOOKS · WEEK 08</span>
          <h1>Small hooks, <span>big impact.</span></h1>
          <p>Explore shared state and live input tracking in two mini exercises.</p>
        </header>
        <div className="exercise-grid">
          <ThemeDemo />
          <CharacterCounter />
        </div>
        <footer className="page-footer">Built with React Context, useState &amp; useRef</footer>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
