import { Component } from 'react'
import reactLogo from '../assets/react.svg'
import './Exercise.css'

const style_header = {
  color: 'white',
  backgroundColor: 'DodgerBlue',
  padding: '10px',
  fontFamily: 'Arial',
}

class Exercise extends Component {
  render() {
    return (
      <section>
        <h1 style={style_header}>HTML Tags in React</h1>
        <p className="para">This paragraph is styled with Exercise.css.</p>
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          Learn about React
        </a>
        <form>
          <label htmlFor="favorite-animal">Favorite animal: </label>
          <input id="favorite-animal" name="favoriteAnimal" type="text" />
          <button type="submit">Submit</button>
        </form>
        <img src={reactLogo} alt="React logo" width="100" />
        <ul>
          <li>Paragraph</li>
          <li>Link</li>
          <li>Form</li>
        </ul>
      </section>
    )
  }
}

export default Exercise