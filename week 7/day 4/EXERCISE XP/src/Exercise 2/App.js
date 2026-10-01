import { Component } from 'react'
import UserFavoriteAnimals from './UserFavoriteAnimals.js'

const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
}

class Exercise2 extends Component {
  render() {
    return (
      <section>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
      </section>
    )
  }
}

export default Exercise2