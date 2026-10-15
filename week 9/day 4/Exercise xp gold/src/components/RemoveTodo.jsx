import { useDispatch } from "react-redux";
import { removeTodo } from "../app/todosSlice.js";

export default function RemoveTodo({ id, text }) {
  const dispatch = useDispatch();

  return (
    <button
      className="remove-button"
      type="button"
      aria-label={`Remove ${text}`}
      onClick={() => dispatch(removeTodo(id))}
    >
      <span aria-hidden="true">×</span>
    </button>
  );
}
