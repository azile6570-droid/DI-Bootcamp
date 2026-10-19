import { useState } from 'react'

type LastAction = 'Incremented' | 'Decremented' | 'Ready when you are'

function Counter() {
  const [count, setCount] = useState<number>(0)
  const [lastAction, setLastAction] = useState<LastAction>('Ready when you are')

  function increment() {
    setCount((currentCount) => currentCount + 1)
    setLastAction('Incremented')
  }

  function decrement() {
    setCount((currentCount) => currentCount - 1)
    setLastAction('Decremented')
  }

  return (
    <div className="counter-widget">
      <div className="counter-value" aria-live="polite">{count.toString().padStart(2, '0')}</div>
      <div className="counter-controls" aria-label="Counter controls">
        <button type="button" onClick={decrement} aria-label="Decrement counter">−</button>
        <button type="button" onClick={increment} aria-label="Increment counter">+</button>
      </div>
      <p className="last-action"><span /> {lastAction}</p>
    </div>
  )
}

export default Counter
