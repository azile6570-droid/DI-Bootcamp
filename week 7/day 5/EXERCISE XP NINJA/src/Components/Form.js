import { useState } from 'react'
import Input from './Input.js'

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const phonePattern = /^\+?[\d\s().-]+$/

function validate(values) {
  const errors = {}

  if (!values.firstName.trim()) errors.firstName = 'First name is required.'
  if (!values.lastName.trim()) errors.lastName = 'Last name is required.'

  const phoneDigits = values.phone.replace(/\D/g, '').length
  if (!values.phone.trim()) {
    errors.phone = 'Phone is required.'
  } else if (!phonePattern.test(values.phone.trim()) || phoneDigits < 7 || phoneDigits > 15) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  return errors
}

function Form() {
  const [formData, setFormData] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setIsSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    setIsSubmitted(Object.keys(validationErrors).length === 0)
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Input
          label="First name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          autoComplete="given-name"
        />
        <Input
          label="Last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          autoComplete="family-name"
        />
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          autoComplete="tel"
          inputMode="tel"
        />
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          inputMode="email"
        />
      </div>
      <div className="form-footer">
        <button className="button" type="submit">Validate details</button>
        {isSubmitted && <p className="success-message" role="status">All details look good.</p>}
      </div>
    </form>
  )
}

export default Form
