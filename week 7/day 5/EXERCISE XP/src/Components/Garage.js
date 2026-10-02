function Garage({ size }) {
  return (
    <div className="garage-note">
      <span className="garage-mark" aria-hidden="true">G</span>
      <p>Who lives in my <strong>{size}</strong> Garage?</p>
    </div>
  )
}

export default Garage
