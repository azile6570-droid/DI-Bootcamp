import { Component } from "react";
import ErrorBoundary from "./ErrorBoundary.js";

export default class App extends Component {
  state = {
    errorInfo: null,
  };

  handleErrorInfo = (errorInfo) => {
    this.setState({ errorInfo });
  };

  render() {
    return (
      <main className="page-shell">
        <header className="topbar">
          <a className="brand" href="/" aria-label="React error modal home">
            <span className="brand-mark">R</span>
            <span>react <i>boundary</i></span>
          </a>
          <span className="topbar-note">A SMALL ERROR-HANDLING DEMO</span>
        </header>

        <section className="hero">
          <span className="eyebrow">ERROR BOUNDARY · MODAL</span>
          <h1>A crash, safely contained.</h1>
          <p>
            Trigger a rendering error and see an error boundary replace the
            broken view with a dismissible modal.
          </p>
        </section>

        <section className="demo-card" aria-labelledby="demo-title">
          <div className="demo-icon" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className="demo-copy">
            <span className="card-label">INTERACTIVE DEMO</span>
            <h2 id="demo-title">Ready to test the boundary?</h2>
            <p>
              The button triggers a rendering error. The boundary catches it
              and opens a modal instead of letting the app disappear.
            </p>
          </div>
          <ErrorBoundary onErrorInfo={this.handleErrorInfo}>
            {(occurError) => (
              <button
                className="trigger-button"
                onClick={occurError}
                type="button"
              >
                Trigger an error
                <span aria-hidden="true">↗</span>
              </button>
            )}
          </ErrorBoundary>
          <p className="boundary-status" aria-live="polite">
            {this.state.errorInfo
              ? "The error was caught and recorded."
              : "The error boundary is active and listening."}
          </p>
        </section>

        <footer className="footer">
          <span>THE REST OF YOUR UI STAYS INTACT</span>
          <span>RENDER-TIME ERRORS, HANDLED</span>
        </footer>
      </main>
    );
  }
}
