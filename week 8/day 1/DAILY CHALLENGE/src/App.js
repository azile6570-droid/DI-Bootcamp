import { Component } from "react";

const initialFormData = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  destination: "",
  lactoseFree: false,
};

class FormComponent extends Component {
  render() {
    const { formData, handleChange } = this.props;

    return (
      <form className="travel-form" method="get">
        <div className="form-grid">
          <label className="field">
            <span>First name</span>
            <input
              autoComplete="given-name"
              name="firstName"
              onChange={handleChange}
              placeholder="e.g. John"
              required
              type="text"
              value={formData.firstName}
            />
          </label>

          <label className="field">
            <span>Last name</span>
            <input
              autoComplete="family-name"
              name="lastName"
              onChange={handleChange}
              placeholder="e.g. Doe"
              required
              type="text"
              value={formData.lastName}
            />
          </label>

          <label className="field field-age">
            <span>Age</span>
            <input
              max="120"
              min="1"
              name="age"
              onChange={handleChange}
              placeholder="25"
              required
              type="number"
              value={formData.age}
            />
          </label>
        </div>

        <fieldset className="form-section">
          <legend>Gender</legend>
          <div className="option-row">
            {["male", "female"].map((gender) => (
              <label className="choice" key={gender}>
                <input
                  checked={formData.gender === gender}
                  name="gender"
                  onChange={handleChange}
                  required
                  type="radio"
                  value={gender}
                />
                <span className="custom-radio" />
                <span>{gender === "male" ? "Male" : "Female"}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="field">
          <span>Destination</span>
          <select
            name="destination"
            onChange={handleChange}
            required
            value={formData.destination}
          >
            <option disabled value="">
              Choose a destination
            </option>
            <option value="Japan">Japan</option>
            <option value="Thailand">Thailand</option>
            <option value="Brazil">Brazil</option>
            <option value="New Zealand">New Zealand</option>
          </select>
        </label>

        <fieldset className="form-section dietary-section">
          <legend>Dietary preferences</legend>
          <label className="choice">
            <input
              checked={formData.lactoseFree}
              name="lactoseFree"
              onChange={handleChange}
              type="checkbox"
              value="on"
            />
            <span className="custom-checkbox" aria-hidden="true" />
            <span>Lactose free</span>
          </label>
        </fieldset>

        <button className="submit-button" type="submit">
          Submit preferences
          <span aria-hidden="true">→</span>
        </button>
        <p className="submit-hint">
          Your preferences will be added to the page URL when submitted.
        </p>
      </form>
    );
  }
}

export default class App extends Component {
  state = { formData: initialFormData };

  handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    this.setState(({ formData }) => ({
      formData: {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  render() {
    return (
      <main className="page-shell">
        <header className="page-header">
          <a className="brand" href="/" aria-label="Wayfarer home">
            <span className="brand-mark">w.</span>
            <span>wayfarer</span>
          </a>
          <span className="header-note">YOUR NEXT JOURNEY STARTS HERE</span>
        </header>

        <section className="intro">
          <div className="intro-copy">
            <span className="eyebrow">TRAVELER PROFILE</span>
            <h1>Tell us a little<br />about yourself.</h1>
            <p>
              Share a few details and we’ll make sure your trip feels like it
              was made just for you.
            </p>
          </div>
          <div className="intro-art" aria-hidden="true">
            <span className="sun" />
            <span className="mountain mountain-back" />
            <span className="mountain mountain-front" />
            <span className="art-label">GO<br />SOMEWHERE</span>
          </div>
        </section>

        <div className="content-grid">
          <section className="form-card" aria-labelledby="form-heading">
            <div className="card-heading">
              <div>
                <span className="step-label">A FEW QUICK DETAILS</span>
                <h2 id="form-heading">Your details</h2>
              </div>
              <span className="step-count">01 <i>/ 01</i></span>
            </div>
            <FormComponent
              formData={this.state.formData}
              handleChange={this.handleChange}
            />
          </section>

          <aside className="preview-card" aria-live="polite">
            <span className="preview-label">LIVE PREVIEW</span>
            <h2>Your traveler<br />profile</h2>
            <div className="preview-divider" />
            <dl className="preview-list">
              <div>
                <dt>NAME</dt>
                <dd>
                  {this.state.formData.firstName || "First name"}{" "}
                  {this.state.formData.lastName}
                </dd>
              </div>
              <div>
                <dt>AGE</dt>
                <dd>{this.state.formData.age || "—"}</dd>
              </div>
              <div>
                <dt>GENDER</dt>
                <dd>
                  {this.state.formData.gender
                    ? this.state.formData.gender[0].toUpperCase() +
                      this.state.formData.gender.slice(1)
                    : "—"}
                </dd>
              </div>
              <div>
                <dt>DESTINATION</dt>
                <dd>{this.state.formData.destination || "Choose a place"}</dd>
              </div>
              <div>
                <dt>DIETARY</dt>
                <dd>
                  {this.state.formData.lactoseFree ? "Lactose free" : "None"}
                </dd>
              </div>
            </dl>
            <span className="preview-sparkle" aria-hidden="true">✳</span>
            <p className="preview-note">
              The best trips begin with knowing what matters to you.
            </p>
          </aside>
        </div>

        <footer className="page-footer">
          <span>WAYFARER TRAVEL CO.</span>
          <span>MADE FOR THE ROAD AHEAD</span>
        </footer>
      </main>
    );
  }
}
