import { Component } from "react";
import data from "./data.json";

export default class Example1 extends Component {
  render() {
    return (
      <section className="exercise-section">
        <h2>Social Medias</h2>
        <ul>
          {data.SocialMedias.map((url) => (
            <li key={url}>
              <a href={url}>{url}</a>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
