import { useState } from "react";
import { connect } from "react-redux";
import { addTask, deleteTask, editTask } from "../redux/actions.js";
import TaskForm from "./TaskForm.jsx";

function TaskList({
  addTask,
  dateLabel,
  deleteTask,
  editTask,
  selectedDay,
  tasks,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  function handleAdd(task) {
    addTask(selectedDay, task);
    setShowAddForm(false);
  }

  function handleEdit(taskId, task) {
    editTask(selectedDay, taskId, task);
    setEditingTaskId(null);
  }

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
          <TaskForm
            onCancel={() => setShowAddForm(false)}
            onSave={handleAdd}
            submitLabel="Add to day"
          />
        </div>
      )}

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li className="task-item" key={task.id}>
              <span className={`task-accent accent-${index % 4}`} aria-hidden="true" />
              {editingTaskId === task.id ? (
                <div className="edit-panel">
                  <TaskForm
                    initialTask={task}
                    onCancel={() => setEditingTaskId(null)}
                    onSave={(updatedTask) => handleEdit(task.id, updatedTask)}
                    submitLabel="Save changes"
                  />
                </div>
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
                    <button
                      aria-label={`Edit ${task.title}`}
                      className="icon-button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingTaskId(task.id);
                      }}
                      type="button"
                    >
                      <svg aria-hidden="true" viewBox="0 0 20 20">
                        <path d="m13.6 3.4 3 3M4 16l3.1-.7L16.2 6a1.4 1.4 0 0 0-2-2L5.1 13.1 4 16Z" />
                      </svg>
                    </button>
                    <button
                      aria-label={`Delete ${task.title}`}
                      className="icon-button delete-button"
                      onClick={() => deleteTask(selectedDay, task.id)}
                      type="button"
                    >
                      <svg aria-hidden="true" viewBox="0 0 20 20">
                        <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 10H6.2l-.7-10m3 2.5v5m3-5v5" />
                      </svg>
                    </button>
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

const mapStateToProps = (state, ownProps) => ({
  tasks: state.tasksByDay[ownProps.selectedDay] ?? [],
});

const mapDispatchToProps = {
  addTask,
  deleteTask,
  editTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
