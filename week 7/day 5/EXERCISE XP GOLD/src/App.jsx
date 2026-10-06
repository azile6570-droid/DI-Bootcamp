import Forms from './Components/Forms.jsx'
import PostAxiosForm from './Components/PostAxiosForm.jsx'
import PostList from './Components/PostList.jsx'
import UserPostForm from './Components/UserPostForm.jsx'
import UsersList from './Components/UsersList.jsx'

function App() {
  return (
    <main className="page-shell">
      <header className="page-intro">
        <p className="eyebrow">REACT · LIFECYCLE METHODS</p>
        <h1>Fetching data from APIs</h1>
        <p>Posts and users loaded from JSONPlaceholder.</p>
      </header>
      <div className="api-grid">
        <PostList />
        <UsersList />
      </div>
      <div className="api-grid post-forms-grid">
        <UserPostForm />
        <PostAxiosForm />
      </div>
      <section className="exercise-section forms-exercise" aria-labelledby="forms-heading">
        <div className="section-heading">
          <span className="section-number">03</span>
          <div>
            <p className="eyebrow">PREVIOUS EXERCISE</p>
            <h1 id="forms-heading">Forms</h1>
          </div>
        </div>
        <Forms />
      </section>
    </main>
  )
}

export default App
