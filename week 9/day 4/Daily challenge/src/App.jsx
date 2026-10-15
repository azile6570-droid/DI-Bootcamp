import AgeControls from "./components/AgeControls.jsx";
import AgeDisplay from "./components/AgeDisplay.jsx";

export default function App() {
  return (
    <main className="page">
      <section className="tracker" aria-labelledby="page-title">
        <header className="page-heading">
          <span className="heading-icon" aria-hidden="true">
            ✳
          </span>
          <p className="eyebrow">A LITTLE PERSPECTIVE</p>
          <h1 id="page-title">Age Tracker</h1>
          <p className="intro">
            Time moves one year at a time. Try changing yours.
          </p>
        </header>

        <div className="age-card">
          <AgeDisplay />
          <AgeControls />
        </div>

        <p className="footnote">Each update takes a moment. Enjoy the pause.</p>
      </section>
    </main>
  );
}
