import { useState } from 'react'
import Garage from './Garage.js'

function Car({ carInfo }) {
  const [color] = useState('red')

  return (
    <div className="demo-panel car-panel">
      <div>
        <p className="result-label">YOUR CAR</p>
        <h3>This car is <span className="color-word">{color}</span> {carInfo.model}</h3>
        <p className="muted-copy">A {carInfo.name} with its color held in component state.</p>
      </div>
      <Garage size="small" />
    </div>
  )
}

export default Car
