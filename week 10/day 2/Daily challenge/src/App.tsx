import { useEffect, useState, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataFetcher from './components/DataFetcher'
import { fetchRecipes } from './features/dataSlice'
import type { AppDispatch, RootState } from './app/store'
import type { Recipe } from './types/types'
import './App.css'

const hasApiKey = Boolean(import.meta.env.VITE_SPOONACULAR_API_KEY?.trim())

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { recipes, status, error, query, totalResults } = useSelector((state: RootState) => state.data)
  const [searchInput, setSearchInput] = useState(query)

  useEffect(() => {
    if (hasApiKey) {
      const request = dispatch(fetchRecipes('pasta'))
      return () => request.abort()
    }
  }, [dispatch])

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedQuery = searchInput.trim()
    if (!trimmedQuery || status === 'loading' || !hasApiKey) return
    dispatch(fetchRecipes(trimmedQuery))
  }

  function renderRecipe(recipe: Recipe) {
    return (
      <article>
        <div className="recipe-image-wrap">
          <img src={recipe.image} alt="" loading="lazy" />
          <span className="recipe-id">NO. {String(recipe.id).slice(-4)}</span>
        </div>
        <div className="recipe-info">
          <p className="recipe-category">A LITTLE INSPIRATION</p>
          <h3>{recipe.title}</h3>
          <a
            className="recipe-link"
            href={`https://spoonacular.com/recipes/${encodeURIComponent(recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}-${recipe.id}`}
            target="_blank"
            rel="noreferrer"
          >
            See recipe <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    )
  }

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Good Things recipe finder home">
          <span className="brand-mark" aria-hidden="true">g.</span>
          <span>good things<span className="brand-period">.</span></span>
        </a>
        <span className="header-note">A RECIPE FOR EVERY MOOD</span>
      </header>

      <section className="hero" id="home" aria-labelledby="page-title">
        <div>
          <p className="eyebrow"><span aria-hidden="true">✳</span> SOMETHING GOOD IS COOKING</p>
          <h1 id="page-title">Find your next<br /><em>favorite thing.</em></h1>
          <p className="hero-copy">A little inspiration for whatever sounds good today. Search a dish, an ingredient, or just follow your appetite.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="art-sun">✳</span>
          <span className="art-plate"><i /><i /><i /><i /></span>
          <span className="art-leaf art-leaf-one">⌁</span>
          <span className="art-leaf art-leaf-two">⌁</span>
        </div>
      </section>

      <section className="search-section" aria-labelledby="search-title">
        <div className="search-heading">
          <div>
            <p className="eyebrow">FOLLOW YOUR CRAVINGS</p>
            <h2 id="search-title">What sounds good?</h2>
          </div>
          {status === 'succeeded' && (
            <span className="result-count">{totalResults.toLocaleString()} IDEAS TO EXPLORE</span>
          )}
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <label className="visually-hidden" htmlFor="recipe-search">Search recipes or ingredients</label>
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            id="recipe-search"
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Try “roasted tomato”, “pasta” or “chocolate”"
            required
          />
          <button type="submit" disabled={status === 'loading' || !hasApiKey}>
            {status === 'loading' ? 'Searching...' : 'Find recipes'} <span aria-hidden="true">→</span>
          </button>
        </form>
        {!hasApiKey && (
          <p className="api-note">
            <span aria-hidden="true">↳</span> Add your Spoonacular key to <code>.env</code> (see <code>.env.example</code>) to start searching.
          </p>
        )}
      </section>

      <section className="results-section" aria-labelledby="results-title">
        <div className="results-heading">
          <div>
            <p className="eyebrow">A FEW GOOD IDEAS</p>
            <h2 id="results-title">{status === 'succeeded' ? `Recipes for ${query}` : 'A little inspiration'}</h2>
          </div>
          <span className="results-label">SPOONACULAR <span aria-hidden="true">✳</span></span>
        </div>

        <DataFetcher<Recipe>
          items={recipes}
          status={status}
          error={error}
          renderItem={renderRecipe}
          keyExtractor={(recipe) => recipe.id}
          emptyMessage="Your recipe search will appear here. Add a Spoonacular API key to get started."
          onRetry={() => dispatch(fetchRecipes(query))}
        />
      </section>

      <footer className="site-footer">
        <span>GOOD FOOD HAS A WAY OF FINDING US</span>
        <span>MADE WITH <i>✳</i> AND A LITTLE CURIOSITY</span>
      </footer>
    </main>
  )
}

export default App
