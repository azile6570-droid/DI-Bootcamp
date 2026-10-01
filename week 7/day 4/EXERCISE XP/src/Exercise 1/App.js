function App() {
  const myelement = <h1>I Love JSX!</h1>
  const sum = 5 + 5

  return (
    <section>
      <p>Hello World!</p>
      {myelement}
      <p>React is {sum} times better with JSX</p>
    </section>
  )
}

export default App