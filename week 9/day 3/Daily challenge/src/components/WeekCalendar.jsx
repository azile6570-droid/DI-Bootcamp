import { useSelector } from "react-redux";
import { getWeekDates, shiftWeek, toDateKey } from "../utils/dates.js";

export default function WeekCalendar({ onSelectDay, selectedDay }) {
  const tasksByDay = useSelector((state) => state.tasksByDay);
  const weekDates = getWeekDates(new Date(`${selectedDay}T12:00:00`));
  const today = toDateKey(new Date());
  const monthLabel = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(weekDates[3]);

  function moveWeek(amount) {
    const selectedDate = new Date(`${selectedDay}T12:00:00`);
    onSelectDay(toDateKey(shiftWeek(selectedDate, amount)));
  }

  return (
    <section aria-label="Choose a day" className="calendar-card">
      <div className="calendar-header">
        <div>
          <p className="eyebrow">YOUR WEEK</p>
          <h2>{monthLabel}</h2>
        </div>
        <div className="calendar-actions">
          <button
            className="today-button"
            onClick={() => onSelectDay(today)}
            type="button"
          >
            Today
          </button>
          <div className="week-controls">
            <button
              aria-label="Previous week"
              onClick={() => moveWeek(-1)}
              type="button"
            >
              ‹
            </button>
            <button
              aria-label="Next week"
              onClick={() => moveWeek(1)}
              type="button"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="week-grid">
        {weekDates.map((date) => {
          const dateKey = toDateKey(date);
          const isSelected = dateKey === selectedDay;
          const isToday = dateKey === today;
          const taskCount = tasksByDay[dateKey]?.length ?? 0;

          return (
            <button
              aria-pressed={isSelected}
              className={`day-button${isSelected ? " is-selected" : ""}${isToday ? " is-today" : ""}`}
              key={dateKey}
              onClick={() => onSelectDay(dateKey)}
              type="button"
            >
              <span className="day-name">
                {new Intl.DateTimeFormat("en", { weekday: "short" }).format(date)}
              </span>
              <span className="day-number">{date.getDate()}</span>
              <span className="day-indicator">
                {taskCount > 0 ? `${taskCount} ${taskCount === 1 ? "task" : "tasks"}` : "\u00a0"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
