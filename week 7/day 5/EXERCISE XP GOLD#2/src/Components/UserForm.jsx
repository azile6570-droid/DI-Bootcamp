import { useState } from 'react'

const emptyUser = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

function UserForm() {
  const [user, setUser] = useState(emptyUser)
  const [submittedUser, setSubmittedUser] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((currentUser) => ({ ...currentUser, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedUser(user)
  }

  const handleReset = () => {
    setUser(emptyUser)
    setSubmittedUser(null)
  }

  return submittedUser ? (
    <div className="submitted-view">
      <p className="success-message" role="status">Your details were submitted.</p>
      <dl className="user-details">
        <div><dt>First name</dt><dd>{submittedUser.firstName}</dd></div>
        <div><dt>Last name</dt><dd>{submittedUser.lastName}</dd></div>
        <div><dt>Phone</dt><dd>{submittedUser.phone}</dd></div>
        <div><dt>Email</dt><dd>{submittedUser.email}</dd></div>
      </dl>
      <button className="button button-outline" type="button" onClick={handleReset}>Reset form</button>
    </div>
  ) : (
    <form className="form-fields" onSubmit={handleSubmit}>
      <label className="field">
        <span>First name</span>
        <input name="firstName" autoComplete="given-name" value={user.firstName} onChange={handleChange} required />
      </label>
      <label className="field">
        <span>Last name</span>
        <input name="lastName" autoComplete="family-name" value={user.lastName} onChange={handleChange} required />
      </label>
      <label className="field">
        <span>Phone</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          pattern="\+?[0-9]{7,15}"
          placeholder="+15551234567"
          title="Enter a valid phone number."
          value={user.phone}
          onChange={handleChange}
          required
        />
      </label>
      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" value={user.email} onChange={handleChange} required />
      </label>
      <button className="button button-dark" type="submit">Submit details</button>
    </form>
  )
}

export default UserForm
