import { useDispatch, useSelector } from "react-redux";
import AddTodo from "./components/AddTodo.jsx";
import TodoList from "./components/TodoList.jsx";
import { fetchTodos } from "./app/todosSlice.js";

export default function App() {
  const dispatch = useDispatch();
  const { todos, status, error } = useSelector((state) => state.todos);
  const completedCount = todos.filter((todo) => todo.completed).length;

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
          <span className="list-count" aria-live="polite">
            {todos.length} {todos.length === 1 ? "TASK" : "TASKS"}
          </span>
        </div>

        <AddTodo />

        <div className="list-toolbar">
          <span className="summary">
            {completedCount} of {todos.length} completed
          </span>
          <button
            className="fetch-button"
            type="button"
            onClick={() => dispatch(fetchTodos())}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <>
                <span className="button-spinner" aria-hidden="true" />
                Loading…
              </>
            ) : (
              "Fetch sample todos"
            )}
          </button>
        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <TodoList />
      </section>

      <footer className="page-footer">
        <span className="footer-sparkle" aria-hidden="true">✳</span>
        Progress, not perfection.
      </footer>
    </main>
  );
}
