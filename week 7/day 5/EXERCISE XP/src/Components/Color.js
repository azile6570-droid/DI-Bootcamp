import { useEffect, useState } from 'react'

function Color() {
  const [favoriteColor, setFavoriteColor] = useState('red')

  useEffect(() => {
    window.alert('useEffect reached')
  }, [favoriteColor])

  const changeColor = () => {
    setFavoriteColor('blue')
  }

  return (
    <div className="demo-panel color-panel">
      <div className="color-swatch" style={{ '--swatch-color': favoriteColor }} aria-hidden="true" />
      <div className="color-details">
        <p className="result-label">FAVORITE COLOR</p>
        <h3>{favoriteColor}</h3>
        <button className="button button-outline" onClick={changeColor}>Change to blue</button>
      </div>
    </div>
  )
}

export default Color
