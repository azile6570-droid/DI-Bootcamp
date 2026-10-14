import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/reducer.js";

export default function DeleteTask({ day, task }) {
  const dispatch = useDispatch();

  return (
    <button
      aria-label={`Delete ${task.title}`}
      className="icon-button delete-button"
      onClick={() => dispatch(deleteTask({ day, taskId: task.id }))}
      type="button"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 10H6.2l-.7-10m3 2.5v5m3-5v5" />
      </svg>
    </button>
  );
}
