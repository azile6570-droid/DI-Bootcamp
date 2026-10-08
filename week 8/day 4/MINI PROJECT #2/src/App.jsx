import { useEffect, useMemo, useState } from "react";
import { Navigate, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { categoryMeta, getCategoryPhotos, getSearchPhotos } from "./data.js";

const categories = ["mountain", "beaches", "birds", "food"];

function Gallery({ photos, title, subtitle, categoryName }) {
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [title, subtitle, categoryName]);

  const visiblePhotos = photos.slice(0, visibleCount);
  const hasMore = visibleCount < photos.length;

  return (
    <section className="gallery-section">
      <div className="gallery-header">
        <div>
          <p className="eyebrow">snap scout</p>
          <h2>{title}</h2>
        </div>
        <p className="subtitle">{subtitle}</p>
      </div>

      <div className="gallery-grid">
        {visiblePhotos.map((photo) => (
          <figure className="photo-card" key={photo.id}>
            <img src={photo.url} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.alt}</figcaption>
          </figure>
        ))}
      </div>

      {hasMore && (
        <div className="gallery-actions">
          <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + 12, photos.length))}>
            Load more
          </button>
        </div>
      )}
    </section>
  );
}

function CategoryPage() {
  const { type } = useParams();
  const category = type ?? "mountain";
  const meta = categoryMeta[category] ?? categoryMeta.mountain;
  const photos = useMemo(() => getCategoryPhotos(category), [category]);

  return (
    <Gallery
      photos={photos}
      title={meta.label}
      subtitle={meta.hero}
      categoryName={category}
    />
  );
}

function SearchPage() {
  const { term } = useParams();
  const query = decodeURIComponent(term ?? "");
  const photos = useMemo(() => getSearchPhotos(query), [query]);

  return (
    <Gallery
      photos={photos}
      title={query ? `Results for “${query}”` : "Popular shots"}
      subtitle={query ? "Fresh finds for your latest trip." : "A quick peek at what everyone is loving."}
      categoryName={query}
    />
  );
}

function Shell() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    navigate(`/search/${encodeURIComponent(trimmed)}`);
    setQuery("");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">S</div>
          <div>
            <p className="brand-title">Snap Scout</p>
            <p className="brand-subtitle">beautiful moments</p>
          </div>
        </div>

        <nav className="nav-menu" aria-label="Main navigation">
          {categories.map((type) => (
            <NavLink
              key={type}
              to={`/${type}`}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {categoryMeta[type].label}
            </NavLink>
          ))}
        </nav>

        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search images"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search images"
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/mountain" replace />} />
          <Route path="/:type" element={<CategoryPage />} />
          <Route path="/search/:term" element={<SearchPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return <Shell />;
}

export default App;
