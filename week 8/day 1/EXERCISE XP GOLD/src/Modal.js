import { Component } from "react";

export default class Modal extends Component {
  render() {
    const { errorInfo, onClose } = this.props;

    return (
      <div
        className="modal-background"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <section
          aria-labelledby="modal-title"
          aria-modal="true"
          className="modal-body"
          role="dialog"
        >
          <div className="modal-icon" aria-hidden="true">
            !
          </div>
          <span className="eyebrow">ERROR BOUNDARY</span>
          <h2 id="modal-title">Something went wrong</h2>
          <p className="modal-message">
            The error was caught, so the rest of the app is still safe.
          </p>
          {errorInfo?.error && (
            <details className="error-details">
              <summary>View error details</summary>
              <pre>
                {errorInfo.error.toString()}
                {"\n"}
                {errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button
            autoFocus
            className="close-button"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </section>
      </div>
    );
  }
}
