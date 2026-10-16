import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  selectFilteredTodosCount,
  selectTodos,
  selectVisibilityFilter,
  setVisibilityFilter,
  toggleTodo,
} from "../app/todosSlice.js";

const filters = ["All", "Active", "Completed"];

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const visibilityFilter = useSelector(selectVisibilityFilter);
  const filteredCount = useSelector(selectFilteredTodosCount);
  const [newTodo, setNewTodo] = useState("");

  const handleToggle = useCallback(
    (id) => dispatch(toggleTodo(id)),
    [dispatch],
  );
  const handleRemove = useCallback(
    (id) => dispatch(removeTodo(id)),
    [dispatch],
  );
  const handleFilterChange = useCallback(
    (filter) => dispatch(setVisibilityFilter(filter)),
    [dispatch],
  );
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const text = newTodo.trim();
      if (!text) return;
      dispatch(addTodo(text));
      setNewTodo("");
    },
    [dispatch, newTodo],
  );

  return (
    <section className="todo-card" aria-label="Todo list">
      <div className="card-topline">
        <div>
          <p className="section-label">YOUR LIST</p>
          <h2>Today’s focus</h2>
        </div>
        <span className="list-count" aria-live="polite">
          {filteredCount} {filteredCount === 1 ? "TASK" : "TASKS"}
        </span>
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <span className="input-sparkle" aria-hidden="true">✳</span>
        <input
          aria-label="New task"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="What would you like to get done?"
        />
        <button className="add-button" type="submit" disabled={!newTodo.trim()}>
          <span aria-hidden="true">+</span> Add
        </button>
      </form>

      <div className="list-toolbar">
        <div className="filter-group" role="group" aria-label="Filter tasks">
          {filters.map((filter) => (
            <button
              key={filter}
              className={visibilityFilter === filter ? "filter-button active" : "filter-button"}
              type="button"
              aria-pressed={visibilityFilter === filter}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <span className="summary" aria-live="polite">
          {filteredCount} {filteredCount === 1 ? "task" : "tasks"}
        </span>
      </div>

      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li className={todo.completed ? "todo-item is-complete" : "todo-item"} key={todo.id}>
              <label className="todo-toggle">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <span className="custom-check" aria-hidden="true">
                  {todo.completed ? "✓" : ""}
                </span>
                <span className="todo-text">{todo.text}</span>
              </label>
              <button
                className="remove-button"
                type="button"
                aria-label={`Delete ${todo.text}`}
                onClick={() => handleRemove(todo.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state" aria-live="polite">
          <span className="empty-icon" aria-hidden="true">✳</span>
          <p>
            {visibilityFilter === "Completed"
              ? "No completed tasks yet. Keep going!"
              : visibilityFilter === "Active"
                ? "Everything is done. Take a little break."
                : "Your list is clear. Add a task to get started."}
          </p>
        </div>
      )}
    </section>
  );
}
