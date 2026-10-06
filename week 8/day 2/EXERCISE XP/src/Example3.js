import { Component } from "react";
import data from "./data.json";

export default class Example3 extends Component {
  render() {
    return (
      <section className="exercise-section">
        <h2>Experiences</h2>
        {data.Experiences.map((experience) => (
          <div className="experience" key={experience.companyName}>
            <h3>
              <a href={experience.url}>{experience.companyName}</a>
            </h3>
            <img
              className="company-logo"
              src={experience.logo}
              alt={`${experience.companyName} logo`}
            />
            {experience.roles.map((role) => (
              <div key={`${experience.companyName}-${role.title}`}>
                <h4>{role.title}</h4>
                <p>{role.description}</p>
                <p>
                  {role.startDate} – {role.endDate} · {role.location}
                </p>
              </div>
            ))}
          </div>
        ))}
      </section>
    );
  }
}
