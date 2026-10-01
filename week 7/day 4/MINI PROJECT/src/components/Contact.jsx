import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

function Contact() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <h2 className="contact-title" id="contact-title">
        Contact us
      </h2>
      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-5 contact-details">
          <p>Contact us and we will get back to you within 24 hours.</p>
          <ul>
            <li>
              <FontAwesomeIcon className="contact-icon" icon={faLocationDot} aria-hidden="true" />
              <span>Company Name</span>
            </li>
            <li>
              <FontAwesomeIcon className="contact-icon" icon={faPhone} aria-hidden="true" />
              <a href="tel:+256778800900">+256 778 800 900</a>
            </li>
            <li>
              <FontAwesomeIcon className="contact-icon" icon={faEnvelope} aria-hidden="true" />
              <a href="mailto:company@gmail.com">company.gmail.com</a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-7">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Contact</label>
            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              placeholder="email address"
              autoComplete="email"
              required
            />
            <label className="visually-hidden" htmlFor="comment">
              Comment
            </label>
            <textarea
              className="form-control"
              id="comment"
              name="comment"
              placeholder="comment"
              required
            />
            <button className="btn btn-send" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact