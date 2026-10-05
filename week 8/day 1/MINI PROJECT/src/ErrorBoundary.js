import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { error, hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <section className="error-card" role="alert">
        <span className="error-icon" aria-hidden="true">
          !
        </span>
        <div>
          <h3>This part of the page ran into an error.</h3>
          <p>
            The rest of the app is still available. You can reload to try
            again.
          </p>
          <button
            className="button button-reload"
            onClick={() => window.location.reload()}
            type="button"
          >
            Reload page
          </button>
          {this.state.error && (
            <details className="error-details">
              <summary>Error details</summary>
              <pre>
                {this.state.error.toString()}
                {"\n"}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      </section>
    );
  }
}
