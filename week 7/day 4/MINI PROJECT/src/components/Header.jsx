function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand-name" href="#top">
          Company
        </a>
        <p className="brand-tagline">We specialise in something ...</p>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#values">Values</a>
          <a href="#mission">Mission</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header