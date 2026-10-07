import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return React.createElement(ThemeContext.Provider, { value }, children);
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button type="button" className="theme-button" onClick={toggleTheme}>
      {theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    </button>
  );
}

function ThemePreview() {
  const { theme } = useContext(ThemeContext);

  const cardStyles = {
    background: theme === "light" ? "#ffffff" : "#111827",
    color: theme === "light" ? "#111827" : "#f9fafb",
    border: theme === "light" ? "1px solid #d1d5db" : "1px solid #374151",
  };

  return (
    <div className="theme-card" style={cardStyles}>
      <h2>Theme preview</h2>
      <p>
        The current theme is <strong>{theme}</strong>.
      </p>
      <ThemeSwitcher />
    </div>
  );
}

function CharacterCounter() {
  const inputRef = useRef(null);
  const [charCount, setCharCount] = useState(0);

  const handleInput = () => {
    const currentValue = inputRef.current?.value ?? "";
    setCharCount(currentValue.length);
  };

  return (
    <div className="counter-card">
      <label htmlFor="message" className="counter-label">
        Type something...
      </label>
      <input
        id="message"
        ref={inputRef}
        type="text"
        onInput={handleInput}
        placeholder="Write here"
        className="counter-input"
      />
      <p className="counter-output">Characters: {charCount}</p>
    </div>
  );
}

function AppContent() {
  const { theme } = useContext(ThemeContext);

  const appStyles = {
    background: theme === "light" ? "#f3f4f6" : "#020817",
    color: theme === "light" ? "#111827" : "#f8fafc",
  };

  return (
    <main className="app-shell" style={appStyles}>
      <div className="exercise-grid">
        <ThemePreview />
        <CharacterCounter />
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
