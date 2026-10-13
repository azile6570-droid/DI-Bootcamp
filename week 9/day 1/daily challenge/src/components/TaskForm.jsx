import { useState } from "react";

export default function TaskForm({
  initialTask,
  onCancel,
  onSave,
  submitLabel,
}) {
  const [title, setTitle] = useState(initialTask?.title ?? "");
  const [time, setTime] = useState(initialTask?.time ?? "");
  const [notes, setNotes] = useState(initialTask?.notes ?? "");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Add a task name before saving.");
      return;
    }

    onSave({
      title: trimmedTitle,
      time,
      notes: notes.trim(),
    });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        <span>Task</span>
        <input
          autoFocus
          maxLength={120}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError("");
          }}
          placeholder="e.g. Prepare a weekly meal plan"
          required
          value={title}
        />
      </label>
      <div className="form-row">
        <label className="time-field">
          <span>Time <em>optional</em></span>
          <input
            onChange={(event) => setTime(event.target.value)}
            type="time"
            value={time}
          />
        </label>
        <label className="notes-field">
          <span>Notes <em>optional</em></span>
          <input
            maxLength={240}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="A few helpful details"
            value={notes}
          />
        </label>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-actions">
        {onCancel && (
          <button className="cancel-button" onClick={onCancel} type="button">
            Cancel
          </button>
        )}
        <button className="save-button" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
