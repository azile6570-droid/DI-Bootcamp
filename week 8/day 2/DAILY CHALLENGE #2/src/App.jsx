import AutoCompletedText from "./components/AutoCompletedText.jsx";

export default function App() {
  return (
    <main className="page-shell">
      <header className="page-intro">
        <p className="eyebrow">A LITTLE WORLD KNOWLEDGE</p>
        <h1>Find a country.</h1>
        <p>Start typing a name and choose a suggestion to complete your search.</p>
      </header>
      <AutoCompletedText />
      <footer className="page-footer">
        <span>COUNTRY INDEX</span>
        <span>TYPE TO EXPLORE</span>
      </footer>
    </main>
  );
}
