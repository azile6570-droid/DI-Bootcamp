import { useState } from "react";
import WeekCalendar from "./components/WeekCalendar.jsx";
import TaskList from "./components/TaskList.jsx";
import { fromDateKey, toDateKey } from "./utils/dates.js";

const today = toDateKey(new Date());

export default function App() {
  const [selectedDay, setSelectedDay] = useState(today);
  const selectedDate = fromDateKey(selectedDay);
  const dateLabel = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(selectedDate);

  return (
    <main className="planner-shell">
      <header className="topbar">
        <a aria-label="Daylight planner home" className="wordmark" href="#">
          <span className="wordmark-icon" aria-hidden="true">✳</span>
          daylight
        </a>
        <span className="topbar-note">A little more intention, every day.</span>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">YOUR PERSONAL DAILY PLANNER</p>
          <h1>Make today<br />feel a little lighter.</h1>
          <p className="welcome-copy">
            Give your plans a place to land. Choose a day, then take it one
            thing at a time.
          </p>
        </div>
        <div className="sun-illustration" aria-hidden="true">
          <span className="sun-orbit orbit-one" />
          <span className="sun-orbit orbit-two" />
          <span className="sun-core" />
          <span className="sun-hill hill-one" />
          <span className="sun-hill hill-two" />
        </div>
      </section>

      <WeekCalendar selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      <TaskList dateLabel={dateLabel} selectedDay={selectedDay} />

      <footer className="footer-note">
        <span aria-hidden="true">✦</span>
        Make space for what matters.
      </footer>
    </main>
  );
}
