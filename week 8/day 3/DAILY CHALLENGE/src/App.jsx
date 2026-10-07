import { useEffect, useRef, useState } from "react";
import { useTasks } from "./TaskContext.jsx";

const filters = [
  { id: "all", label: "All tasks" },
  { id: "active", label: "In progress" },
  { id: "completed", label: "Completed" },
];

function AddTaskForm() {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const { addTask } = useTasks();

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText("");
    inputRef.current?.focus();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task">
        New task
      </label>
      <span className="add-symbol" aria-hidden="true">+</span>
      <input
        ref={inputRef}
        id="new-task"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What would you like to get done?"
        autoComplete="off"
      />
      <button className="btn add-button" type="submit" disabled={!text.trim()}>
        Add task
      </button>
    </form>
  );
}

function TaskRow({ task, index }) {
  const { toggleTask, editTask, removeTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  function beginEditing() {
    setDraft(task.text);
    setIsEditing(true);
  }

  function saveEdit() {
    if (!draft.trim()) {
      editInputRef.current?.focus();
      return;
    }
    editTask(task.id, draft);
    setIsEditing(false);
  }

  function cancelEdit() {
    setDraft(task.text);
    setIsEditing(false);
  }

  function handleEditKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      saveEdit();
    } else if (event.key === "Escape") {
      cancelEdit();
    }
  }

  return (
    <li
      className={`task-row${task.completed ? " task-completed" : ""}`}
      style={{ "--row-index": index }}
    >
      <label className="task-toggle">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={`${task.completed ? "Reopen" : "Complete"} ${task.text}`}
        />
        <span className="checkmark" aria-hidden="true">
          {task.completed ? "✓" : ""}
        </span>
      </label>

      {isEditing ? (
        <input
          ref={editInputRef}
          className="edit-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleEditKeyDown}
          aria-label={`Edit ${task.text}`}
        />
      ) : (
        <button
          className="task-title"
          type="button"
          onClick={beginEditing}
          title="Click to edit"
        >
          {task.text}
        </button>
      )}

      {isEditing ? (
        <div className="row-actions editing-actions">
          <button className="row-action save-action" type="button" onClick={saveEdit}>
            Save
          </button>
          <button className="row-action" type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="row-actions">
          <button
            className="row-action"
            type="button"
            onClick={beginEditing}
            aria-label={`Edit ${task.text}`}
          >
            Edit
          </button>
          <button
            className="delete-task"
            type="button"
            onClick={() => removeTask(task.id)}
            aria-label={`Remove ${task.text}`}
            title="Remove task"
          >
            ×
          </button>
        </div>
      )}
    </li>
  );
}

function TaskList() {
  const { tasks, filter } = useTasks();
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (visibleTasks.length === 0) {
    const hasTasks = tasks.length > 0;
    return (
      <div className="empty-list">
        <span className="empty-icon" aria-hidden="true">{hasTasks ? "✓" : "✳"}</span>
        <h3>{hasTasks ? "No tasks in this view." : "A fresh start."}</h3>
        <p>
          {hasTasks
            ? "Choose another filter to see your tasks."
            : "Add a task above and get your plans moving."}
        </p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {visibleTasks.map((task, index) => (
        <TaskRow key={task.id} task={task} index={index} />
      ))}
    </ul>
  );
}

function TaskManager() {
  const {
    tasks,
    filter,
    setFilter,
    clearCompleted,
    storageError,
  } = useTasks();
  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <main className="page">
      <header className="page-header">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1>Make room for <span>what matters.</span></h1>
        <p className="subtitle">
          Capture your plans, keep them current, and focus on one step at a time.
        </p>
      </header>

      <section className="manager-card" aria-label="Task manager">
        <div className="card-topline">
          <div>
            <h2>My tasks</h2>
            <p>
              {remainingCount === 0
                ? "You're all caught up."
                : `${remainingCount} ${remainingCount === 1 ? "task" : "tasks"} left to complete`}
            </p>
          </div>
          <div className="completion-stat" aria-label={`${completedCount} completed`}>
            <strong>{completedCount}</strong>
            <span>DONE</span>
          </div>
        </div>

        <div className="progress-summary">
          <div className="progress-copy">
            <span>Overall progress</span>
            <strong>{progress}%</strong>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Task completion progress"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <AddTaskForm />

        <div className="list-toolbar">
          <div className="filter-tabs" aria-label="Filter tasks">
            {filters.map((item) => (
              <button
                key={item.id}
                className={filter === item.id ? "selected" : ""}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                {item.id === "all" && <span className="filter-count">{tasks.length}</span>}
              </button>
            ))}
          </div>
          {completedCount > 0 && (
            <button className="clear-completed" type="button" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>

        {storageError && <p className="storage-error" role="alert">{storageError}</p>}
        <TaskList />
        <footer className="card-footer">
          <span className="status-dot" />
          Edit any task by clicking its title. Press Enter to save or Escape to cancel.
          <span className="state-note">useContext · useReducer · useRef</span>
        </footer>
      </section>

      <footer className="page-note">Your tasks stay saved in this browser.</footer>
    </main>
  );
}

export default function App() {
  return <TaskManager />;
}
