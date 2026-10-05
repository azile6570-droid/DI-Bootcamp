import { Component } from "react";
import ErrorBoundary from "../ErrorBoundary.js";

export default class ColumnRight extends Component {
  crasher = { function: "I live to crash" };

  state = {
    text: JSON.stringify(this.crasher),
  };

  replaceStringWithObject = () => {
    this.setState({ text: this.crasher });
  };

  invokeEventHandler = () => {
    throw new Error("Event handler error");
  };

  render() {
    return (
      <section className="column-right">
        <div className="column-heading">
          <span className="column-number">02 / ERROR HANDLING</span>
          <h2>Right column</h2>
          <p>
            React handles errors differently depending on where they happen.
          </p>
        </div>

        <div className="explanation-card">
          <span className="type-label">
            <i className="type-dot type-dot-render" />
            RENDERING ERROR
          </span>
          <ErrorBoundary>
            <div className="crash-copy">
              <p>
                Clicking the button replaces a stringified object with a plain
                JavaScript object. React can’t render a plain object as a
                child.
              </p>
              <div className="code-preview">
                <span>VALUE</span>
                <code>{this.state.text}</code>
              </div>
            </div>
          </ErrorBoundary>
          <button
            className="button button-danger"
            onClick={this.replaceStringWithObject}
            type="button"
          >
            Replace string with object
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <div className="explanation-card event-card">
          <span className="type-label">
            <i className="type-dot type-dot-event" />
            EVENT HANDLER ERROR
          </span>
          <p>
            This throws an error inside a click handler. Error boundaries do
            not catch errors in event handlers, so check the developer console.
          </p>
          <button
            className="button button-outline"
            onClick={this.invokeEventHandler}
            type="button"
          >
            Invoke event handler
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
    );
  }
}
