import { useState } from 'react'

function App() {
  const [languages, setLanguages] = useState([
    { name: 'Php', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaScript', votes: 0 },
    { name: 'Java', votes: 0 },
  ])

  const voteForLanguage = (languageName) => {
    setLanguages((currentLanguages) =>
      currentLanguages.map((language) =>
        language.name === languageName
          ? { ...language, votes: language.votes + 1 }
          : language,
      ),
    )
  }

  const totalVotes = languages.reduce((total, language) => total + language.votes, 0)

  return (
    <main className="page-shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">DAILY CHALLENGE</p>
          <h1>Language voting</h1>
        </div>
        <p className="total-votes" aria-live="polite">
          <span>{totalVotes}</span> {totalVotes === 1 ? 'vote' : 'votes'} cast
        </p>
      </header>

      <section className="voting-list" aria-label="Vote for a programming language">
        {languages.map((language, index) => (
          <article className="language-row" key={language.name}>
            <span className="language-index">0{index + 1}</span>
            <h2>{language.name}</h2>
            <p className="vote-count" aria-live="polite">
              <strong>{language.votes}</strong>
              <span>{language.votes === 1 ? 'vote' : 'votes'}</span>
            </p>
            <button
              className="vote-button"
              type="button"
              onClick={() => voteForLanguage(language.name)}
              aria-label={`Vote for ${language.name}`}
            >
              Vote <span aria-hidden="true">+</span>
            </button>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
