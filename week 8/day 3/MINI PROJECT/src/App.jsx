import { useEffect, useState } from "react";
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useWeather } from "./WeatherContext.jsx";
import {
  describeWeather,
  findCity,
  formatDay,
  formatTime,
  getForecast,
} from "./weatherApi.js";

function Header() {
  const { favorites } = useWeather();

  return (
    <header className="app-header">
      <div className="container header-inner">
        <NavLink className="brand" to="/weather" aria-label="Atmos weather home">
          <span className="brand-symbol" aria-hidden="true">
            <svg viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="6" />
              <path d="M18 3v4m0 22v4M3 18h4m22 0h4M7.4 7.4l2.8 2.8m15.6 15.6 2.8 2.8m0-21.2-2.8 2.8m-15.6 15.6-2.8 2.8" />
            </svg>
          </span>
          <span>atmos<span className="brand-period">.</span></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/weather" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Weather
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Favorites
            <span className="favorite-count">{favorites.length}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function SearchForm({ onCitySelected }) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const cityName = query.trim();
    if (!cityName) {
      setError("Enter a city name to search.");
      return;
    }

    setError("");
    setIsSearching(true);
    try {
      const city = await findCity(cityName);
      onCitySelected(city);
      setQuery("");
    } catch (searchError) {
      console.error("Unable to search for city:", searchError);
      setError(searchError.message || "Unable to search for that city.");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit} role="search">
        <label className="visually-hidden" htmlFor="city-search">
          Search for a city
        </label>
        <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" />
        </svg>
        <input
          id="city-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search any city..."
          autoComplete="off"
        />
        <button className="btn search-button" type="submit" disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className="inline-error" role="alert">{error}</p>}
    </div>
  );
}

function WeatherDetails({ weather }) {
  const current = weather.current;
  const details = [
    { label: "Feels like", value: `${Math.round(current.apparent_temperature)}°`, icon: "◉" },
    { label: "Humidity", value: `${current.relative_humidity_2m}%`, icon: "◌" },
    { label: "Wind", value: `${Math.round(current.wind_speed_10m)} km/h`, icon: "⌁" },
    { label: "Precipitation", value: `${current.precipitation} mm`, icon: "⌄" },
    { label: "Sunrise", value: formatTime(weather.daily.sunrise[0]), icon: "↑" },
    { label: "Sunset", value: formatTime(weather.daily.sunset[0]), icon: "↓" },
  ];

  return (
    <div className="weather-details">
      {details.map((detail) => (
        <div className="detail-item" key={detail.label}>
          <span className="detail-icon" aria-hidden="true">{detail.icon}</span>
          <div>
            <p>{detail.label}</p>
            <strong>{detail.value}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

function Forecast({ days }) {
  return (
    <section className="forecast-section">
      <div className="section-title-row">
        <div>
          <p className="section-kicker">A LOOK AHEAD</p>
          <h2>5-day forecast</h2>
        </div>
        <span className="forecast-caption">Local time</span>
      </div>
      <div className="forecast-list">
        {days.time.map((date, index) => {
          const summary = describeWeather(days.weather_code[index]);
          return (
            <div className="forecast-day" key={date}>
              <span className="forecast-name">{index === 0 ? "Today" : formatDay(date)}</span>
              <span className={`forecast-icon ${summary.tone}`} aria-label={summary.label}>
                {summary.icon}
              </span>
              <span className="forecast-condition">{summary.label}</span>
              <span className="forecast-temperatures">
                <strong>{Math.round(days.temperature_2m_max[index])}°</strong>
                <span>{Math.round(days.temperature_2m_min[index])}°</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function WeatherPage() {
  const {
    activeLocation,
    favorites,
    setActiveLocation,
    toggleFavorite,
    storageError,
  } = useWeather();
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setWeatherError("");

    getForecast(activeLocation, controller.signal)
      .then(setWeather)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Unable to load weather:", error);
          setWeatherError(error.message || "Unable to load the weather right now.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [activeLocation]);

  const isFavorite = favorites.some(
    (city) =>
      city.latitude === activeLocation.latitude &&
      city.longitude === activeLocation.longitude,
  );
  const currentSummary = weather
    ? describeWeather(weather.current.weather_code)
    : null;

  return (
    <main className="container page-content">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">YOUR WEATHER, AT A GLANCE</p>
          <h1>Find your <span>forecast.</span></h1>
          <p className="page-description">
            Search a city to see what the sky has in store.
          </p>
        </div>
        <div className="live-indicator"><span /> LIVE WEATHER</div>
      </section>

      <SearchForm onCitySelected={setActiveLocation} />
      {storageError && <p className="inline-error" role="alert">{storageError}</p>}

      {isLoading && (
        <div className="loading-panel" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading weather for {activeLocation.name}...
        </div>
      )}
      {!isLoading && weatherError && (
        <div className="error-panel" role="alert">
          <strong>Weather unavailable</strong>
          <p>{weatherError}</p>
          <button className="btn btn-outline-primary btn-sm" onClick={() => setActiveLocation({ ...activeLocation })} type="button">
            Try again
          </button>
        </div>
      )}

      {weather && !weatherError && (
        <>
          <section className={`current-weather ${currentSummary.tone}`} aria-label="Current weather">
            <div className="weather-location">
              <span className="location-pin" aria-hidden="true">⌖</span>
              <div>
                <p className="section-kicker">CURRENT WEATHER</p>
                <h2>{activeLocation.name}</h2>
                <p className="location-country">
                  {[activeLocation.admin1, activeLocation.country].filter(Boolean).join(", ")}
                </p>
              </div>
              <button
                className={`favorite-button${isFavorite ? " saved" : ""}`}
                type="button"
                onClick={() => toggleFavorite(activeLocation)}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? "Remove city from favorites" : "Save city to favorites"}
              >
                <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
                <span>{isFavorite ? "Saved" : "Add to favorites"}</span>
              </button>
            </div>
            <div className="current-reading">
              <span className="weather-illustration" aria-hidden="true">{currentSummary.icon}</span>
              <div className="temperature-block">
                <p className="temperature">
                  {Math.round(weather.current.temperature_2m)}
                  <span>°</span>
                </p>
                <p className="condition">{currentSummary.label}</p>
              </div>
              <div className="today-range">
                <span>H {Math.round(weather.daily.temperature_2m_max[0])}°</span>
                <i />
                <span>L {Math.round(weather.daily.temperature_2m_min[0])}°</span>
              </div>
            </div>
            <div className="weather-updated">
              Local time {weather.current.time.replace("T", " ")}
              {weather.current.is_day ? " · Daytime" : " · Night"}
            </div>
          </section>

          <WeatherDetails weather={weather} />
          <Forecast days={weather.daily} />
        </>
      )}
    </main>
  );
}

function FavoritesPage() {
  const { favorites, setActiveLocation, toggleFavorite, storageError } = useWeather();
  const navigate = useNavigate();

  function showCity(city) {
    setActiveLocation(city);
    navigate("/weather");
  }

  return (
    <main className="container page-content favorites-page">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
          <h1>Favorite <span>places.</span></h1>
          <p className="page-description">
            Keep the cities you care about close.
          </p>
        </div>
        <div className="favorites-total">
          <strong>{favorites.length}</strong>
          <span>{favorites.length === 1 ? "CITY SAVED" : "CITIES SAVED"}</span>
        </div>
      </section>
      {storageError && <p className="inline-error" role="alert">{storageError}</p>}

      {favorites.length === 0 ? (
        <section className="empty-favorites">
          <span className="empty-star" aria-hidden="true">☆</span>
          <h2>Your favorite cities will live here.</h2>
          <p>Search for a city and save it to quickly check the weather later.</p>
          <button className="btn btn-primary" type="button" onClick={() => navigate("/weather")}>
            Explore weather
          </button>
        </section>
      ) : (
        <section className="favorites-grid" aria-label="Favorite cities">
          {favorites.map((city) => (
            <article className="favorite-card" key={`${city.latitude},${city.longitude}`}>
              <div className="favorite-card-top">
                <span className="favorite-card-icon" aria-hidden="true">☀</span>
                <button
                  type="button"
                  className="remove-favorite"
                  onClick={() => toggleFavorite(city)}
                  aria-label={`Remove ${city.name} from favorites`}
                  title="Remove from favorites"
                >
                  ×
                </button>
              </div>
              <p className="section-kicker">SAVED CITY</p>
              <h2>{city.name}</h2>
              <p className="location-country">
                {[city.admin1, city.country].filter(Boolean).join(", ")}
              </p>
              <button className="btn view-weather-button" type="button" onClick={() => showCity(city)}>
                View weather <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<Navigate to="/weather" replace />} />
      </Routes>
      <footer className="app-footer">
        <span>Atmos Weather</span>
        <span>Weather data by Open-Meteo</span>
      </footer>
    </div>
  );
}
