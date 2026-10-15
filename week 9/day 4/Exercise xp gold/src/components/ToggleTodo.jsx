import { useDispatch } from "react-redux";
import { toggleTodo } from "../app/todosSlice.js";

export default function ToggleTodo({ todo }) {
  const dispatch = useDispatch();

  return (
    <label className="todo-toggle">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />
      <span className="custom-check" aria-hidden="true">
        {todo.completed ? "✓" : ""}
      </span>
      <span className="todo-text">{todo.text}</span>
    </label>
  );
}
