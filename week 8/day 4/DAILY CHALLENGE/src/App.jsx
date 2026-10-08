import { useState } from "react";

const operationLabels = {
  add: "Addition",
  subtract: "Subtraction",
  multiply: "Multiplication",
  divide: "Division",
};

function calculate(firstNumber, secondNumber, operation) {
  switch (operation) {
    case "add":
      return firstNumber + secondNumber;
    case "subtract":
      return firstNumber - secondNumber;
    case "multiply":
      return firstNumber * secondNumber;
    case "divide":
      if (secondNumber === 0) {
        return "Cannot divide by zero";
      }
      return firstNumber / secondNumber;
    default:
      return firstNumber + secondNumber;
  }
}

function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (firstNumber === "" || secondNumber === "") {
      setResult("Enter both numbers");
      return;
    }

    const firstValue = Number(firstNumber);
    const secondValue = Number(secondNumber);

    if (Number.isNaN(firstValue) || Number.isNaN(secondValue)) {
      setResult("Enter valid numbers");
      return;
    }

    setResult(calculate(firstValue, secondValue, operation));
  }

  return (
    <main className="calculator-shell">
      <section className="calculator-card">
        <h1>React Calculator</h1>

        <form onSubmit={handleSubmit} className="calculator-form">
          <div className="input-group">
            <label htmlFor="first-number">First number</label>
            <input
              id="first-number"
              type="number"
              value={firstNumber}
              onChange={(event) => setFirstNumber(event.target.value)}
              placeholder="Enter a number"
            />
          </div>

          <div className="input-group">
            <label htmlFor="second-number">Second number</label>
            <input
              id="second-number"
              type="number"
              value={secondNumber}
              onChange={(event) => setSecondNumber(event.target.value)}
              placeholder="Enter a number"
            />
          </div>

          <div className="input-group">
            <label htmlFor="operation">Operation</label>
            <select
              id="operation"
              value={operation}
              onChange={(event) => setOperation(event.target.value)}
            >
              <option value="add">Addition</option>
              <option value="subtract">Subtraction</option>
              <option value="multiply">Multiplication</option>
              <option value="divide">Division</option>
            </select>
          </div>

          <button type="submit">Add Them</button>
        </form>

        <div className="result-box" aria-live="polite">
          <p className="result-label">Result</p>
          <p className="result-value">
            {result === "" ? "—" : typeof result === "number" ? Number(result).toFixed(2).replace(/\.00$/, "") : result}
          </p>
          <p className="operation-label">{operationLabels[operation]}</p>
        </div>
      </section>
    </main>
  );
}

export default App;
