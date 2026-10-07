import { useState } from "react";
import { useTasks } from "./TaskContext.jsx";

const filters = [
  { id: "all", label: "All tasks" },
  { id: "active", label: "In progress" },
  { id: "completed", label: "Completed" },
];

function TaskForm() {
  const [text, setText] = useState("");
  const { addTask } = useTasks();

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) {
      return;
    }

    addTask(text);
    setText("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">
        New task
      </label>
      <input
        id="new-task"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs to get done?"
        autoComplete="off"
      />
      <button type="submit" disabled={!text.trim()}>
        <span aria-hidden="true">+</span>
        Add task
      </button>
    </form>
  );
}

function TaskItem({ task }) {
  const { toggleTask, removeTask } = useTasks();

  return (
    <li className={`task-item${task.completed ? " is-completed" : ""}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={`${task.completed ? "Mark as in progress" : "Complete"}: ${task.text}`}
        />
        <span className="custom-checkbox" aria-hidden="true">
          {task.completed ? "✓" : ""}
        </span>
      </label>
      <span className="task-text">{task.text}</span>
      <button
        className="remove-button"
        type="button"
        onClick={() => removeTask(task.id)}
        aria-label={`Remove ${task.text}`}
        title="Remove task"
      >
        ×
      </button>
    </li>
  );
}

function TaskList({ filter }) {
  const { tasks } = useTasks();
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }
    if (filter === "completed") {
      return task.completed;
    }
    return true;
  });

  if (visibleTasks.length === 0) {
    const isEmpty = tasks.length === 0;
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">
          {isEmpty ? "✳" : "✓"}
        </span>
        <p>{isEmpty ? "Nothing on your list yet." : "No tasks in this view."}</p>
        <span>
          {isEmpty
            ? "Add a task above to get started."
            : "Try another filter to see your tasks."}
        </span>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {visibleTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

function TaskManager() {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("all");
  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  return (
    <main className="page">
      <header className="page-header">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1>Make room for <span>what matters.</span></h1>
        <p className="subtitle">
          A little focus goes a long way. Capture your tasks and take them one
          step at a time.
        </p>
      </header>

      <section className="manager-card" aria-label="Task manager">
        <div className="card-topline">
          <div>
            <h2>My tasks</h2>
            <p>
              {remainingCount === 1
                ? "1 task left to complete"
                : `${remainingCount} tasks left to complete`}
            </p>
          </div>
          <div className="completion-stat" aria-label={`${completedCount} completed`}>
            <strong>{completedCount}</strong>
            <span>DONE</span>
          </div>
        </div>

        <TaskForm />

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
                {item.id === "all" && (
                  <span className="filter-count">{tasks.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <TaskList filter={filter} />
        <footer className="card-footer">
          <span className="status-dot" />
          Tasks are managed with React Context and useReducer
        </footer>
      </section>

      <footer className="page-note">
        Progress is built one checked box at a time.
      </footer>
    </main>
  );
}

export default function App() {
  return <TaskManager />;
}
