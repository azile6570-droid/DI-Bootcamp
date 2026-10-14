import { useDispatch } from "react-redux";
import { addTask } from "../redux/reducer.js";
import TaskForm from "./TaskForm.jsx";

export default function AddTask({ day, onAdded, onCancel }) {
  const dispatch = useDispatch();

  function handleSave(task) {
    dispatch(addTask(day, task));
    onAdded();
  }

  return (
    <TaskForm
      onCancel={onCancel}
      onSave={handleSave}
      submitLabel="Add to day"
    />
  );
}
