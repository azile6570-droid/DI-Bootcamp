import { faBuilding, faGlobe, faLandmark } from '@fortawesome/free-solid-svg-icons'
import Header from './components/Header.jsx'
import Card from './components/Card.jsx'
import Contact from './components/Contact.jsx'
import './App.css'

const sections = [
  {
    id: 'about',
    title: 'About the Company',
    icon: faBuilding,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'values',
    title: 'Our Values',
    icon: faGlobe,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 'mission',
    title: 'Our Mission',
    icon: faLandmark,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
]

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="features container" aria-label="Company information">
          {sections.map((section, index) => (
            <Card key={section.id} {...section} shaded={index % 2 === 1} />
          ))}
        </section>
        <Contact />
      </main>
    </>
  )
}

export default App
