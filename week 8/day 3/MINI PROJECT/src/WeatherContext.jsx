import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FAVORITES_KEY = "herolo-weather-favorites";
const WeatherContext = createContext(null);

const defaultLocation = {
  name: "Tel Aviv",
  country: "Israel",
  latitude: 32.0853,
  longitude: 34.7818,
  timezone: "Asia/Jerusalem",
};

function readFavorites() {
  try {
    const storedValue = localStorage.getItem(FAVORITES_KEY);
    if (!storedValue) {
      return [];
    }

    const favorites = JSON.parse(storedValue);
    if (!Array.isArray(favorites)) {
      throw new Error("Saved favorites must be an array.");
    }

    return favorites.filter(
      (city) =>
        typeof city?.name === "string" &&
        typeof city?.country === "string" &&
        Number.isFinite(city?.latitude) &&
        Number.isFinite(city?.longitude),
    );
  } catch (error) {
    console.error("Unable to load saved weather favorites:", error);
    return [];
  }
}

export function WeatherProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites);
  const [activeLocation, setActiveLocation] = useState(defaultLocation);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      setStorageError("");
    } catch (error) {
      console.error("Unable to save weather favorites:", error);
      setStorageError("Favorites could not be saved in this browser.");
    }
  }, [favorites]);

  function toggleFavorite(city) {
    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (favorite) =>
          favorite.latitude === city.latitude &&
          favorite.longitude === city.longitude,
      );

      return exists
        ? currentFavorites.filter(
            (favorite) =>
              favorite.latitude !== city.latitude ||
              favorite.longitude !== city.longitude,
          )
        : [...currentFavorites, city];
    });
  }

  const value = useMemo(
    () => ({
      favorites,
      activeLocation,
      setActiveLocation,
      toggleFavorite,
      storageError,
    }),
    [favorites, activeLocation, storageError],
  );

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === null) {
    throw new Error("useWeather must be used within a WeatherProvider.");
  }
  return context;
}

export { defaultLocation };
