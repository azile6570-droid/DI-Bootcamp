import { useSelector } from "react-redux";
import RemoveTodo from "./RemoveTodo.jsx";
import ToggleTodo from "./ToggleTodo.jsx";

export default function TodoList() {
  const { todos, status } = useSelector((state) => state.todos);

  if (status === "loading" && todos.length === 0) {
    return (
      <div className="empty-state" role="status">
        <span className="loading-spinner" aria-hidden="true" />
        <p>Fetching a little inspiration…</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✧</span>
        <p>Your list is clear. Add a task to get started.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" aria-label="Todos">
      {todos.map((todo) => (
        <li
          className={todo.completed ? "todo-item is-complete" : "todo-item"}
          key={todo.id}
        >
          <ToggleTodo todo={todo} />
          <RemoveTodo id={todo.id} text={todo.text} />
        </li>
      ))}
    </ul>
  );
}
