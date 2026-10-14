import { useDispatch } from "react-redux";
import { editTask } from "../redux/reducer.js";
import TaskForm from "./TaskForm.jsx";

export default function EditTask({
  day,
  onCancel,
  onSaved,
  onStart,
  task,
}) {
  const dispatch = useDispatch();

  if (!onStart) {
    return (
      <div className="edit-panel">
        <TaskForm
          initialTask={task}
          onCancel={onCancel}
          onSave={(changes) => {
            dispatch(editTask({ day, taskId: task.id, changes }));
            onSaved();
          }}
          submitLabel="Save changes"
        />
      </div>
    );
  }

  return (
    <button
      aria-label={`Edit ${task.title}`}
      className="icon-button"
      onClick={onStart}
      type="button"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path d="m13.6 3.4 3 3M4 16l3.1-.7L16.2 6a1.4 1.4 0 0 0-2-2L5.1 13.1 4 16Z" />
      </svg>
    </button>
  );
}
