import { Component } from "react";
import ErrorBoundary from "./ErrorBoundary.js";

class BuggyCounter extends Component {
  state = { counter: 0 };

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  render() {
    if (this.state.counter >= 5) {
      throw new Error("I crashed!");
    }

    return (
      <button className="counter-button" onClick={this.handleClick} type="button">
        Counter: {this.state.counter}
      </button>
    );
  }
}

class LifecycleDemo extends Component {
  state = { favoriteColor: "red" };

  componentDidMount() {
    this.colorTimer = window.setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearTimeout(this.colorTimer);
  }

  shouldComponentUpdate() {
    return true;
  }

  getSnapshotBeforeUpdate() {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate() {
    console.log("after update");
  }

  changeFavoriteColor = () => {
    this.setState({ favoriteColor: "blue" });
  };

  render() {
    return (
      <div className="color-demo">
        <div
          className="color-swatch"
          style={{ backgroundColor: this.state.favoriteColor }}
        />
        <p>
          My favorite color is <strong>{this.state.favoriteColor}</strong>.
        </p>
        <button
          className="button button-secondary"
          onClick={this.changeFavoriteColor}
          type="button"
        >
          Change color to blue
        </button>
        <p className="hint">
          It starts red, then changes to yellow after one second. Check the console
          for lifecycle logs.
        </p>
      </div>
    );
  }
}

class Child extends Component {
  componentWillUnmount() {
    window.alert("The Child component has unmounted.");
  }

  render() {
    return <h2 className="hello-message">Hello World!</h2>;
  }
}

const sections = [
  { id: "errors", label: "Error boundaries", number: "01" },
  { id: "lifecycle", label: "Updating lifecycle", number: "02" },
  { id: "unmounting", label: "Unmounting", number: "03" },
];

export default class App extends Component {
  state = {
    activeSection: "errors",
    show: true,
  };

  selectSection = (activeSection) => {
    this.setState({ activeSection });
  };

  deleteChild = () => {
    this.setState({ show: false });
  };

  renderErrorSimulation() {
    const { activeSection } = this.state;

    if (activeSection === "errors") {
      return (
        <section className="content-card">
          <div className="section-heading">
            <span className="eyebrow">EXERCISE 1</span>
            <h2>Error boundary simulations</h2>
            <p>
              Click each counter five times to see how the boundary handles a
              rendering error.
            </p>
          </div>

          <div className="simulation-list">
            <article className="simulation">
              <div>
                <span className="simulation-number">SIMULATION 1</span>
                <h3>One boundary, two counters</h3>
                <p>When either counter crashes, the boundary replaces both.</p>
              </div>
              <ErrorBoundary>
                <div className="counter-row">
                  <BuggyCounter />
                  <BuggyCounter />
                </div>
              </ErrorBoundary>
            </article>

            <article className="simulation">
              <div>
                <span className="simulation-number">SIMULATION 2</span>
                <h3>Separate boundaries</h3>
                <p>
                  Each counter has its own boundary, so one can keep working.
                </p>
              </div>
              <div className="counter-row">
                <ErrorBoundary>
                  <BuggyCounter />
                </ErrorBoundary>
                <ErrorBoundary>
                  <BuggyCounter />
                </ErrorBoundary>
              </div>
            </article>

            <article className="simulation">
              <div>
                <span className="simulation-number">SIMULATION 3</span>
                <h3>No boundary</h3>
                <p>
                  This counter is intentionally unprotected. Reaching five
                  crashes the app.
                </p>
              </div>
              <div className="counter-row">
                <BuggyCounter />
              </div>
            </article>
          </div>
        </section>
      );
    }

    if (activeSection === "lifecycle") {
      return (
        <section className="content-card">
          <div className="section-heading">
            <span className="eyebrow">EXERCISE 2</span>
            <h2>Updating lifecycle</h2>
            <p>
              Watch the color update, then trigger another update with the
              button.
            </p>
          </div>
          <LifecycleDemo />
        </section>
      );
    }

    return (
      <section className="content-card">
        <div className="section-heading">
          <span className="eyebrow">EXERCISE 3</span>
          <h2>Unmounting a child</h2>
          <p>
            Remove the child component to trigger its unmount lifecycle method.
          </p>
        </div>
        <div className="unmount-demo">
          {this.state.show ? (
            <Child />
          ) : (
            <p className="empty-message">
              The child component has been removed.
            </p>
          )}
          <button
            className="button button-danger"
            disabled={!this.state.show}
            onClick={this.deleteChild}
            type="button"
          >
            Delete child
          </button>
        </div>
      </section>
    );
  }

  render() {
    return (
      <main className="app-shell">
        <header className="hero">
          <span className="eyebrow">REACT CLASS COMPONENTS</span>
          <h1>Lifecycle &amp; error boundaries</h1>
          <p>A hands-on tour of rendering errors, updates, and unmounting.</p>
        </header>

        <nav className="section-nav" aria-label="Exercises">
          {sections.map((section) => (
            <button
              aria-current={
                this.state.activeSection === section.id ? "page" : undefined
              }
              className={`nav-item${this.state.activeSection === section.id ? " is-active" : ""}`}
              key={section.id}
              onClick={() => this.selectSection(section.id)}
              type="button"
            >
              <span className="nav-number">{section.number}</span>
              {section.label}
            </button>
          ))}
        </nav>

        {this.renderErrorSimulation()}
      </main>
    );
  }
}
