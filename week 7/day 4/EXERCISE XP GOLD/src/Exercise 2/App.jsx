const planets = ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune']

function App() {
  return (
    <section aria-label="Planets">
      <ul className="list-group">
        {planets.map((planet) => (
          <li className="list-group-item" key={planet}>
            {planet}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default App