import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  editTask,
  selectCategories,
  selectTasksByCategory,
  toggleTaskCompleted,
  updateTaskProgress,
} from "../app/productivitySlice.js";

export default function TaskList({ selectedCategoryId, heading }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => selectTasksByCategory(state, selectedCategoryId));
  const categories = useSelector(selectCategories);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const handleAddTask = useCallback(
    (event) => {
      event.preventDefault();
      const taskTitle = title.trim();
      if (!taskTitle) return;
      const categoryId = selectedCategoryId === "all"
        ? categories[0]?.id ?? null
        : selectedCategoryId === "uncategorized"
          ? null
          : selectedCategoryId;
      dispatch(addTask({ title: taskTitle, notes, categoryId }));
      setTitle("");
      setNotes("");
    },
    [categories, dispatch, notes, selectedCategoryId, title],
  );

  const beginEdit = useCallback((task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditNotes(task.notes);
  }, []);

  const handleSaveEdit = useCallback(
    (event, taskId) => {
      event.preventDefault();
      if (!editTitle.trim()) return;
      dispatch(editTask({ id: taskId, title: editTitle, notes: editNotes }));
      setEditingId(null);
    },
    [dispatch, editNotes, editTitle],
  );

  const handleToggleComplete = useCallback(
    (taskId) => dispatch(toggleTaskCompleted(taskId)),
    [dispatch],
  );

  const handleProgressChange = useCallback(
    (taskId, progress) => dispatch(updateTaskProgress({ id: taskId, progress: Number(progress) })),
    [dispatch],
  );

  const handleDelete = useCallback(
    (taskId) => dispatch(deleteTask(taskId)),
    [dispatch],
  );

  const getCategoryName = (categoryId) =>
    categories.find((category) => category.id === categoryId)?.name ?? "Uncategorized";

  return (
    <section className="task-panel" aria-labelledby="task-heading">
      <div className="task-panel-heading">
        <div>
          <p className="eyebrow">YOUR DAILY PLAN</p>
          <h2 id="task-heading">{heading}</h2>
        </div>
        <span className="task-count" aria-live="polite">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      <form className="task-form" onSubmit={handleAddTask}>
        <div className="task-form-fields">
          <input
            aria-label="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What would you like to work on?"
          />
          <input
            aria-label="Task notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Add a note (optional)"
          />
        </div>
        <button type="submit" disabled={!title.trim()}>
          <span aria-hidden="true">+</span> Add task
        </button>
      </form>

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li className={task.completed ? "task-card completed" : "task-card"} key={task.id}>
              {editingId === task.id ? (
                <form className="edit-task-form" onSubmit={(event) => handleSaveEdit(event, task.id)}>
                  <input
                    aria-label="Edit task title"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                    autoFocus
                  />
                  <input
                    aria-label="Edit task notes"
                    value={editNotes}
                    onChange={(event) => setEditNotes(event.target.value)}
                    placeholder="Add a note"
                  />
                  <div className="edit-actions">
                    <button type="submit" disabled={!editTitle.trim()}>Save changes</button>
                    <button type="button" className="quiet-button" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="task-main">
                    <button
                      className={task.completed ? "complete-toggle checked" : "complete-toggle"}
                      type="button"
                      aria-label={task.completed ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
                      aria-pressed={task.completed}
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.completed ? "✓" : ""}
                    </button>
                    <div className="task-copy">
                      <div className="task-title-row">
                        <h3>{task.title}</h3>
                        <span className="task-category">{getCategoryName(task.categoryId)}</span>
                      </div>
                      {task.notes && <p>{task.notes}</p>}
                    </div>
                  </div>
                  <div className="task-progress">
                    <label htmlFor={`progress-${task.id}`}>Progress</label>
                    <input
                      id={`progress-${task.id}`}
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={task.progress}
                      aria-label={`Progress for ${task.title}`}
                      onChange={(event) => handleProgressChange(task.id, event.target.value)}
                    />
                    <span>{task.progress}%</span>
                  </div>
                  <div className="task-actions">
                    <button type="button" onClick={() => beginEdit(task)}>Edit</button>
                    <button type="button" className="delete-task" onClick={() => handleDelete(task.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state" aria-live="polite">
          <span aria-hidden="true">✳</span>
          <p>No tasks here yet. Add one small step to get started.</p>
        </div>
      )}
    </section>
  );
}
