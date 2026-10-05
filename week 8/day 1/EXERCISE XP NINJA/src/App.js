import { Component } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDateParts = () => {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    dayOfWeek: date.getDay(),
    dayOfMonth: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
};

const twoDigits = (value) => String(value).padStart(2, "0");

export default class App extends Component {
  state = getDateParts();

  componentDidMount() {
    this.clockInterval = window.setInterval(() => {
      this.setState(getDateParts());
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.clockInterval);
  }

  render() {
    const {
      year,
      month,
      dayOfWeek,
      dayOfMonth,
      hour,
      minute,
      second,
    } = this.state;
    const hourAngle = ((hour % 12) + minute / 60) * 30;
    const minuteAngle = (minute + second / 60) * 6;
    const secondAngle = second * 6;
    const dateLabel = `${weekdays[dayOfWeek]}, ${months[month]} ${dayOfMonth}`;
    const timeLabel = `${twoDigits(hour)}:${twoDigits(minute)}:${twoDigits(second)}`;

    return (
      <main className="page-shell">
        <header className="topbar">
          <a className="brand" href="/" aria-label="Compass clock home">
            <span className="brand-mark" aria-hidden="true">
              ✳
            </span>
            <span>FIELDNOTES <i>· TIMEKEEPER</i></span>
          </a>
          <span className="live-indicator">
            <i />
            LIVE LOCAL TIME
          </span>
        </header>

        <section className="intro">
          <span className="eyebrow">A LITTLE ORIENTATION</span>
          <h1>Find your<br />place in time.</h1>
          <p>
            A compass-inspired clock, keeping the date and time moving with
            you.
          </p>
        </section>

        <section className="clock-card" aria-label={`Current time ${timeLabel}`}>
          <div className="clock-meta clock-meta-year">
            <span className="meta-label">YEAR</span>
            <strong>{year}</strong>
          </div>
          <div className="clock-meta clock-meta-month">
            <span className="meta-label">MONTH</span>
            <strong>{months[month]}</strong>
          </div>

          <div className="clock-face" aria-hidden="true">
            <div className="face-glow" />
            {Array.from({ length: 60 }, (_, index) => (
              <span
                className={`tick${index % 5 === 0 ? " tick-major" : ""}`}
                key={index}
                style={{ "--tick-angle": `${index * 6}deg` }}
              />
            ))}
            <span className="compass-label compass-north">N</span>
            <span className="compass-label compass-east">E</span>
            <span className="compass-label compass-south">S</span>
            <span className="compass-label compass-west">W</span>
            <span className="dial-date">{twoDigits(dayOfMonth)}</span>
            <span
              className="clock-hand hour-hand"
              style={{ "--hand-angle": `${hourAngle}deg` }}
            />
            <span
              className="clock-hand minute-hand"
              style={{ "--hand-angle": `${minuteAngle}deg` }}
            />
            <span
              className="clock-hand second-hand"
              style={{ "--hand-angle": `${secondAngle}deg` }}
            />
            <span className="clock-pin" />
            <span className="face-caption">LOCAL · 24 HOUR</span>
          </div>

          <div className="weekday-marker">
            <span className="marker-line" />
            <span>{weekdays[dayOfWeek]}</span>
            <span className="marker-line" />
          </div>

          <div className="digital-time" aria-live="off">
            <span>{timeLabel}</span>
            <i>LOCAL TIME</i>
          </div>
          <p className="linear-date">{dateLabel}</p>
        </section>

        <footer className="footer">
          <span>YOUR CLOCK, RIGHT WHERE YOU ARE</span>
          <span>UPDATED EVERY SECOND</span>
        </footer>
      </main>
    );
  }
}
