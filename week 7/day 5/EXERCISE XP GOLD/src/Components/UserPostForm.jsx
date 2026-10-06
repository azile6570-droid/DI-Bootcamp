import { Component } from 'react'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users/'

export default class UserPostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      email: '',
      isSubmitting: false,
      errorMsg: '',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value, errorMsg: '' })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { user, email } = this.state

    this.setState({ isSubmitting: true, errorMsg: '' })

    try {
      const response = await fetch(USERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ name: user, email }),
      })

      if (!response.ok) {
        throw new Error(`Unable to submit user (HTTP ${response.status}).`)
      }

      const postedUser = await response.json()
      console.log('Posted user:', postedUser)
    } catch (error) {
      console.error('Unable to post user:', error)
      this.setState({
        errorMsg: error.message || 'Unable to submit user.',
      })
    } finally {
      this.setState({ isSubmitting: false })
    }
  }

  render() {
    const { user, email, isSubmitting, errorMsg } = this.state

    return (
      <section className="api-card" aria-labelledby="user-post-heading">
        <div className="api-card-heading">
          <span className="api-card-number">03</span>
          <h2 id="user-post-heading">POST JSON with fetch</h2>
        </div>
        <form className="api-form" onSubmit={this.handleSubmit}>
          <label className="form-field">
            <span className="result-label">USER</span>
            <input
              className="text-input"
              type="text"
              name="user"
              placeholder="Enter a user name"
              value={user}
              onChange={this.handleChange}
              required
            />
          </label>
          <label className="form-field">
            <span className="result-label">EMAIL</span>
            <input
              className="text-input"
              type="email"
              name="email"
              placeholder="name@example.com"
              value={email}
              onChange={this.handleChange}
              required
            />
          </label>
          <button className="button button-dark" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit user'}
          </button>
          {errorMsg && <p className="api-error" role="alert">{errorMsg}</p>}
        </form>
      </section>
    )
  }
}
