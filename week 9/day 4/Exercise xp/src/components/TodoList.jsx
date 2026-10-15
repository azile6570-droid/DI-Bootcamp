import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleTodo } from "../app/todosSlice.js";

export default function TodoList({ filter }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks here yet.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {filteredTasks.map((task) => (
        <li className={task.completed ? "todo-item completed" : "todo-item"} key={task.id}>
          <label className="todo-check">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTodo(task.id))}
            />
            <span>{task.text}</span>
          </label>

          <button
            type="button"
            className="delete-button"
            aria-label={`Delete ${task.text}`}
            onClick={() => dispatch(removeTodo(task.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
