import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helloMessage: "",
      inputValue: "",
      responseMessage: "",
      isSubmitting: false,
      errorMessage: "",
    };
    this.abortController = null;
  }

  componentDidMount() {
    const controller = new AbortController();
    this.abortController = controller;

    this.loadHelloMessage(controller.signal);
  }

  componentWillUnmount() {
    this.abortController?.abort();
  }

  loadHelloMessage = async (signal) => {
    try {
      const response = await fetch("/api/hello", { signal });
      if (!response.ok) {
        throw new Error(`Unable to load the greeting (HTTP ${response.status}).`);
      }

      const helloMessage = await response.text();
      if (!signal.aborted) {
        this.setState({ helloMessage });
      }
    } catch (error) {
      if (error.name !== "AbortError" && !signal.aborted) {
        this.setState({ errorMessage: error.message });
      }
    }
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      responseMessage: "",
      errorMessage: "",
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      isSubmitting: true,
      responseMessage: "",
      errorMessage: "",
    });

    try {
      const response = await fetch("/api/world", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: this.state.inputValue }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `The server returned HTTP ${response.status}.`);
      }

      this.setState({ responseMessage: data.message });
    } catch (error) {
      this.setState({
        errorMessage: error.message || "Unable to send your message.",
      });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const {
      helloMessage,
      inputValue,
      responseMessage,
      isSubmitting,
      errorMessage,
    } = this.state;

    return (
      <main className="page-shell">
        <header className="page-intro">
          <p className="eyebrow">REACT ↔ EXPRESS</p>
          <h1>Send a message.</h1>
          <p>A small round trip from a React form to an Express server and back.</p>
        </header>

        <section className="message-card" aria-labelledby="hello-heading">
          <div className="section-label">
            <span className="step-number">01</span>
            <span>SERVER GREETING</span>
          </div>
          <h2 id="hello-heading">{helloMessage || "Connecting to Express..."}</h2>
        </section>

        <section className="message-card form-card" aria-labelledby="form-heading">
          <div className="section-label">
            <span className="step-number">02</span>
            <span>POST /API/WORLD</span>
          </div>
          <h2 id="form-heading">What would you like to send?</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="message">Your message</label>
            <div className="form-row">
              <input
                id="message"
                type="text"
                value={inputValue}
                onChange={this.handleChange}
                placeholder="Type something..."
                required
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
          {responseMessage && (
            <p className="response-message" role="status">
              {responseMessage}
            </p>
          )}
          {errorMessage && (
            <p className="error-message" role="alert">
              {errorMessage}
            </p>
          )}
        </section>
      </main>
    );
  }
}
