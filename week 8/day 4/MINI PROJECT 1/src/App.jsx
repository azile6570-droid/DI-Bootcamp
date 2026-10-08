import { useState } from "react";
import { quotes } from "./quotes.js";

const palettes = [
  {
    background: "#e8e8f5",
    accent: "#6255a5",
    button: "#6255a5",
    buttonText: "#ffffff",
  },
  {
    background: "#f5e9df",
    accent: "#b45e3d",
    button: "#b45e3d",
    buttonText: "#ffffff",
  },
  {
    background: "#deeee7",
    accent: "#397b62",
    button: "#397b62",
    buttonText: "#ffffff",
  },
  {
    background: "#f4e4eb",
    accent: "#a94f75",
    button: "#a94f75",
    buttonText: "#ffffff",
  },
  {
    background: "#e1edf2",
    accent: "#39718a",
    button: "#39718a",
    buttonText: "#ffffff",
  },
];

function getDifferentIndex(currentIndex, itemCount) {
  if (itemCount < 2) {
    return currentIndex;
  }

  const nextIndex = Math.floor(Math.random() * (itemCount - 1));
  return nextIndex >= currentIndex ? nextIndex + 1 : nextIndex;
}

function App() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const quote = quotes[quoteIndex];
  const palette = palettes[paletteIndex];

  function showAnotherQuote() {
    setQuoteIndex(getDifferentIndex(quoteIndex, quotes.length));
    setPaletteIndex(getDifferentIndex(paletteIndex, palettes.length));
  }

  return (
    <main
      className="page"
      style={{
        "--page-color": palette.background,
        "--quote-color": palette.accent,
        "--button-color": palette.button,
        "--button-text": palette.buttonText,
      }}
    >
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Good Words home">
          <span className="wordmark-icon" aria-hidden="true">g.</span>
          good words
        </a>
        <span className="header-note">A moment of inspiration</span>
      </header>

      <section className="quote-section" aria-label="Random quote">
        <p className="section-label">
          <span className="label-line" aria-hidden="true" />
          YOUR DAILY PAUSE
        </p>

        <article className="quote-card" aria-live="polite" aria-atomic="true">
          <span className="quote-mark" aria-hidden="true">“</span>
          <blockquote>
            <h1>{quote.quote}</h1>
          </blockquote>
          <p className="quote-author">
            <span className="author-line" aria-hidden="true" />
            {quote.author}
          </p>

          <div className="card-divider" />

          <button className="next-button" type="button" onClick={showAnotherQuote}>
            <span>Find another thought</span>
            <span className="button-arrow" aria-hidden="true">↗</span>
          </button>
        </article>

        <p className="page-caption">A new perspective is just one thought away.</p>
      </section>

      <footer className="site-footer">
        <span>GOOD WORDS</span>
        <span className="footer-dot" aria-hidden="true">·</span>
        <span>TAKE WHAT YOU NEED</span>
      </footer>
    </main>
  );
}

export default App;
