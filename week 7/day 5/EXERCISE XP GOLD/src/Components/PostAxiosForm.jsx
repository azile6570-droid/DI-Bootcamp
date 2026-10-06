import axios from 'axios'
import { Component } from 'react'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export default class PostAxiosForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      title: '',
      body: '',
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
    const { userId, title, body } = this.state
    const post = { userId: Number(userId), title, body }

    this.setState({ isSubmitting: true, errorMsg: '' })

    try {
      const response = await axios.post(POSTS_URL, post, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
      console.log('Posted post:', response.data)
    } catch (error) {
      console.error('Unable to post post with Axios:', error)
      this.setState({
        errorMsg: error.response
          ? `Unable to submit post (HTTP ${error.response.status}).`
          : error.message || 'Unable to submit post.',
      })
    } finally {
      this.setState({ isSubmitting: false })
    }
  }

  render() {
    const { userId, title, body, isSubmitting, errorMsg } = this.state

    return (
      <section className="api-card" aria-labelledby="axios-post-heading">
        <div className="api-card-heading">
          <span className="api-card-number">04</span>
          <h2 id="axios-post-heading">POST JSON with Axios</h2>
        </div>
        <form className="api-form" onSubmit={this.handleSubmit}>
          <label className="form-field">
            <span className="result-label">USER ID</span>
            <input
              className="text-input"
              type="number"
              name="userId"
              placeholder="Enter a user ID"
              value={userId}
              onChange={this.handleChange}
              min="1"
              required
            />
          </label>
          <label className="form-field">
            <span className="result-label">TITLE</span>
            <input
              className="text-input"
              type="text"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={this.handleChange}
              required
            />
          </label>
          <label className="form-field">
            <span className="result-label">BODY</span>
            <textarea
              className="text-input textarea-input"
              name="body"
              placeholder="Write the post body"
              value={body}
              onChange={this.handleChange}
              required
            />
          </label>
          <button className="button button-dark" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit post'}
          </button>
          {errorMsg && <p className="api-error" role="alert">{errorMsg}</p>}
        </form>
      </section>
    )
  }
}
