import axios from "axios";
import { Component } from "react";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export default class PostAxiosForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      title: "",
      body: "",
      isSubmitting: false,
      errorMsg: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, errorMsg: "" });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userId, title, body } = this.state;
    const post = { userId: Number(userId), title, body };

    this.setState({ isSubmitting: true, errorMsg: "" });

    try {
      const response = await axios.post(POSTS_URL, post, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      console.log("Posted post:", response.data);
    } catch (error) {
      console.error("Unable to post post with Axios:", error);
      this.setState({
        errorMsg: error.response
          ? `Unable to submit post (HTTP ${error.response.status}).`
          : error.message || "Unable to submit post.",
      });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { userId, title, body, isSubmitting, errorMsg } = this.state;

    return (
      <section className="form-card" aria-labelledby="axios-post-heading">
        <div className="card-heading">
          <span className="card-number">02</span>
          <div>
            <p className="eyebrow">AXIOS</p>
            <h2 id="axios-post-heading">Post an article</h2>
          </div>
        </div>
        <form className="post-form" onSubmit={this.handleSubmit}>
          <label className="form-field">
            <span>User ID</span>
            <input
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
            <span>Title</span>
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={this.handleChange}
              required
            />
          </label>
          <label className="form-field">
            <span>Body</span>
            <textarea
              name="body"
              placeholder="Write the post body"
              value={body}
              onChange={this.handleChange}
              required
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit post"}
          </button>
          {errorMsg && <p className="error-message" role="alert">{errorMsg}</p>}
        </form>
      </section>
    );
  }
}
