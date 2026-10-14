import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm.jsx";
import TodoList from "./components/TodoList.jsx";

const filters = ["all", "active", "completed"];

export default function App() {
  const [filter, setFilter] = useState("all");

  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">A LITTLE SPACE FOR BIG PLANS</p>
        <h1>Make room<br />for what matters.</h1>
        <p className="intro">
          One small step at a time. Add a task, then enjoy the feeling of
          checking it off.
        </p>
      </header>

      <section className="todo-card" aria-label="Todo list">
        <div className="card-topline">
          <div>
            <p className="section-label">YOUR LIST</p>
            <h2>Today’s focus</h2>
          </div>
          <span className="list-date">
            <span className="date-dot" />
            IN PROGRESS
          </span>
        </div>

        <AddTodoForm />

        <div className="list-toolbar">
          <span className="toolbar-label">SHOW</span>
          <div className="filter-group" aria-label="Filter tasks">
            {filters.map((name) => (
              <button
                aria-pressed={filter === name}
                className={`filter-button${filter === name ? " is-selected" : ""}`}
                key={name}
                onClick={() => setFilter(name)}
                type="button"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <TodoList filter={filter} />
      </section>

      <footer className="page-footer">
        <span className="footer-sparkle" aria-hidden="true">✳</span>
        Progress, not perfection.
      </footer>
    </main>
  );
}
