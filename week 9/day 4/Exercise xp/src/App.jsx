import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import { clearCompleted } from "./app/todosSlice.js";

const filters = ["all", "active", "completed"];

export default function App() {
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }, [tasks]);

  return (
    <main className="page-shell">
      <section className="board-card">
        <header className="board-header">
          <div>
            <p className="eyebrow">focus board</p>
            <h1>Today's priorities</h1>
          </div>
          <span className="status-pill">{stats.remaining} left</span>
        </header>

        <TodoForm />

        <div className="toolbar">
          <div className="filter-group" aria-label="Task filters">
            {filters.map((name) => (
              <button
                key={name}
                type="button"
                className={filter === name ? "filter-button active" : "filter-button"}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => dispatch(clearCompleted())}
            disabled={stats.completed === 0}
          >
            Clear completed
          </button>
        </div>

        <div className="summary-row" aria-live="polite">
          <span>{stats.total} tasks</span>
          <span>{stats.completed} done</span>
          <span>{stats.remaining} active</span>
        </div>

        <TodoList filter={filter} />
      </section>
    </main>
  );
}
