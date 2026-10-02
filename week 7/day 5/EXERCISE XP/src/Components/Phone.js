import { useState } from 'react'

function Phone() {
  const [brand] = useState('Samsung')
  const [model] = useState('Galaxy S20')
  const [color, setColor] = useState('black')
  const [year] = useState(2020)

  const changeColor = () => {
    setColor('blue')
  }

  return (
    <div className="demo-panel phone-panel">
      <div className="phone-visual" aria-hidden="true">
        <span className="phone-camera" />
        <span className="phone-screen" />
      </div>
      <div className="phone-details">
        <p className="result-label">DEVICE DETAILS</p>
        <h3>{brand} <span>{model}</span></h3>
        <p className="muted-copy">{year} <span className="detail-divider">/</span> {color}</p>
        <button className="button button-outline" onClick={changeColor}>Change color</button>
      </div>
    </div>
  )
}

export default Phone
