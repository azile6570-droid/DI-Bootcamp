import { Component } from "react";
import data from "./data.json";

export default class Example2 extends Component {
  render() {
    return (
      <section className="exercise-section">
        <h2>Skills</h2>
        {data.Skills.map((area) => (
          <div key={area.Area}>
            <h3>{area.Area}</h3>
            <ul>
              {area.SkillSet.map((skill) => (
                <li key={skill.Name}>
                  {skill.Name}
                  {skill.Hot && <span className="badge text-bg-warning ms-2">Hot</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    );
  }
}
