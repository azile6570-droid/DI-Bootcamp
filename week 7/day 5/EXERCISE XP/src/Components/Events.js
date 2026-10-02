import { useState } from 'react'

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true)

  const clickMe = () => {
    window.alert('I was clicked')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.alert(event.currentTarget.value)
    }
  }

  const toggleButton = () => {
    setIsToggleOn((previousValue) => !previousValue)
  }

  return (
    <div className="demo-panel events-panel">
      <div className="event-control">
        <p className="result-label">CLICK EVENT</p>
        <button className="button button-dark" onClick={clickMe}>Click me</button>
      </div>
      <label className="event-control">
        <span className="result-label">PRESS ENTER TO ALERT</span>
        <input className="text-input" type="text" onKeyDown={handleKeyDown} placeholder="Type a message" />
      </label>
      <div className="event-control toggle-control">
        <p className="result-label">STATE TOGGLE</p>
        <button
          className={`toggle-button ${isToggleOn ? 'is-on' : ''}`}
          onClick={toggleButton}
          aria-pressed={isToggleOn}
        >
          <span className="toggle-indicator" aria-hidden="true" />
          <span>{isToggleOn ? 'ON' : 'OFF'}</span>
        </button>
      </div>
    </div>
  )
}

export default Events
