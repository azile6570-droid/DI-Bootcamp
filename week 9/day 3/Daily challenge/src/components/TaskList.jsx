import { useState } from "react";
import { useSelector } from "react-redux";
import AddTask from "./AddTask.jsx";
import DeleteTask from "./DeleteTask.jsx";
import EditTask from "./EditTask.jsx";

const EMPTY_TASKS = [];

export default function TaskList({ dateLabel, selectedDay }) {
  const tasks = useSelector(
    (state) => state.tasksByDay[selectedDay] ?? EMPTY_TASKS,
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  return (
    <section aria-label={`Tasks for ${dateLabel}`} className="tasks-card">
      <div className="tasks-header">
        <div>
          <p className="eyebrow">YOUR PLAN</p>
          <h2>{dateLabel}</h2>
        </div>
        <button
          className="new-task-button"
          onClick={() => {
            setEditingTaskId(null);
            setShowAddForm((visible) => !visible);
          }}
          type="button"
        >
          <span aria-hidden="true">+</span>
          Add a task
        </button>
      </div>

      {showAddForm && (
        <div className="form-panel">
          <AddTask
            day={selectedDay}
            onCancel={() => setShowAddForm(false)}
            onAdded={() => setShowAddForm(false)}
          />
        </div>
      )}

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li className="task-item" key={task.id}>
              <span className={`task-accent accent-${index % 4}`} aria-hidden="true" />
              {editingTaskId === task.id ? (
                <EditTask
                  day={selectedDay}
                  onCancel={() => setEditingTaskId(null)}
                  onSaved={() => setEditingTaskId(null)}
                  task={task}
                />
              ) : (
                <>
                  <div className="task-copy">
                    <div className="task-title-line">
                      {task.time && <time className="task-time">{task.time}</time>}
                      <h3>{task.title}</h3>
                    </div>
                    {task.notes && <p>{task.notes}</p>}
                  </div>
                  <div className="task-actions">
                    <EditTask
                      day={selectedDay}
                      onCancel={() => setEditingTaskId(null)}
                      onStart={() => {
                        setShowAddForm(false);
                        setEditingTaskId(task.id);
                      }}
                      onSaved={() => setEditingTaskId(null)}
                      task={task}
                    />
                    <DeleteTask day={selectedDay} task={task} />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        !showAddForm && (
          <div className="empty-state">
            <span className="empty-art" aria-hidden="true">✳</span>
            <h3>A fresh page.</h3>
            <p>Nothing planned for this day yet. Add a task when you’re ready.</p>
            <button
              className="empty-add-button"
              onClick={() => setShowAddForm(true)}
              type="button"
            >
              <span aria-hidden="true">+</span> Add your first task
            </button>
          </div>
        )
      )}

      <div className="tasks-footer">
        <span>{tasks.length} {tasks.length === 1 ? "task" : "tasks"} planned</span>
        <span>Take it one step at a time</span>
      </div>
    </section>
  );
}
