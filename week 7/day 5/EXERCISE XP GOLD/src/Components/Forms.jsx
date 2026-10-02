import { useState } from 'react'

function Forms() {
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(null)
  const [errormessage, setErrormessage] = useState('')
  const [message, setMessage] = useState('I am learning how forms work in React.')
  const [car, setCar] = useState('Volvo')

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'age') {
      setAge(value === '' ? null : value)
      setErrormessage(
        value.trim() !== '' && !Number.isFinite(Number(value))
          ? 'Age must be a number.'
          : '',
      )
      return
    }

    setUsername(value)
  }

  const mySubmitHandler = (event) => {
    event.preventDefault()
    if (errormessage) return
    window.alert(username)
  }

  let header = null
  if (username) {
    header = (
      <h2 className="form-result">
        Hello {username}{age !== null && age !== '' ? `, age ${age}` : ''}
      </h2>
    )
  }

  return (
    <div className="forms-panel">
      <form className="user-form" onSubmit={mySubmitHandler}>
        {header}
        <div className="form-grid">
          <label className="form-field">
            <span className="result-label">NAME</span>
            <input
              className="text-input"
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>
          <label className="form-field">
            <span className="result-label">AGE</span>
            <input
              className="text-input"
              type="text"
              name="age"
              value={age ?? ''}
              onChange={handleChange}
              inputMode="numeric"
              placeholder="Enter your age"
              aria-invalid={Boolean(errormessage)}
              aria-describedby={errormessage ? 'age-error' : undefined}
            />
            {errormessage && <span className="form-error" id="age-error">{errormessage}</span>}
          </label>
        </div>
        <button className="button button-dark" type="submit" disabled={!username || Boolean(errormessage)}>
          Submit
        </button>
      </form>

      <div className="form-extras">
        <label className="form-field">
          <span className="result-label">TEXTAREA</span>
          <textarea
            className="text-input textarea-input"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>
        <label className="form-field">
          <span className="result-label">CAR BRAND</span>
          <select className="text-input" value={car} onChange={(event) => setCar(event.target.value)}>
            <option value="Volvo">Volvo</option>
            <option value="Saab">Saab</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default Forms
