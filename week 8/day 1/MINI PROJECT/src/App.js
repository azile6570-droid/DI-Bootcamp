import { Component } from "react";
import ColumnLeft from "./columns/ColumnLeft.js";
import ColumnRight from "./columns/ColumnRight.js";
import ErrorBoundary from "./ErrorBoundary.js";

export default class App extends Component {
  render() {
    return (
      <main className="app-shell">
        <header className="topbar">
          <a className="brand" href="/" aria-label="React error boundary demo">
            <span className="brand-symbol">R</span>
            <span>Error boundaries <i>in React</i></span>
          </a>
          <span className="topbar-note">A RESILIENT UI DEMO</span>
        </header>

        <section className="intro">
          <span className="eyebrow">REACT · ERROR HANDLING</span>
          <h1>Errors happen.<br />Your whole app shouldn’t disappear.</h1>
          <p>
            See how error boundaries isolate rendering errors and keep the rest
            of your interface working.
          </p>
        </section>

        <div className="columns">
          <div className="column">
            <ColumnLeft />
          </div>
          <div className="column">
            <ErrorBoundary>
              <ColumnRight />
            </ErrorBoundary>
          </div>
        </div>

        <footer className="footer">
          <span>REACT ERROR BOUNDARIES</span>
          <span>RENDERING ERRORS ≠ EVENT HANDLER ERRORS</span>
        </footer>
      </main>
    );
  }
}
