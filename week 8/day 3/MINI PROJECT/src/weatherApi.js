const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function findCity(cityName) {
  const params = new URLSearchParams({
    name: cityName,
    count: "1",
    language: "en",
    format: "json",
  });
  const response = await fetch(`${GEOCODING_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`City search failed (HTTP ${response.status}).`);
  }

  const data = await response.json();
  const city = data.results?.[0];
  if (!city) {
    throw new Error(`No city found for "${cityName}". Try another search.`);
  }

  return {
    name: city.name,
    country: city.country ?? city.country_code ?? "Unknown country",
    admin1: city.admin1 ?? "",
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone ?? "auto",
  };
}

export async function getForecast(city, signal) {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
    timezone: city.timezone || "auto",
    forecast_days: "5",
  });
  const response = await fetch(`${FORECAST_URL}?${params}`, { signal });
  if (!response.ok) {
    throw new Error(`Weather request failed (HTTP ${response.status}).`);
  }
  return response.json();
}

export function describeWeather(code) {
  if (code === 0) return { label: "Clear sky", icon: "☀", tone: "sunny" };
  if (code === 1) return { label: "Mainly clear", icon: "🌤", tone: "sunny" };
  if (code === 2) return { label: "Partly cloudy", icon: "⛅", tone: "cloudy" };
  if (code === 3) return { label: "Overcast", icon: "☁", tone: "cloudy" };
  if ([45, 48].includes(code)) return { label: "Foggy", icon: "🌫", tone: "cloudy" };
  if ([51, 53, 55, 56, 57].includes(code)) {
    return { label: "Drizzle", icon: "🌦", tone: "rainy" };
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { label: "Rain", icon: "🌧", tone: "rainy" };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { label: "Snow", icon: "❄", tone: "snowy" };
  }
  if ([95, 96, 99].includes(code)) {
    return { label: "Thunderstorm", icon: "⛈", tone: "stormy" };
  }
  return { label: "Weather unavailable", icon: "☁", tone: "cloudy" };
}

export function formatDay(date) {
  return new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(
    new Date(`${date}T12:00:00`),
  );
}

export function formatTime(dateTime) {
  if (!dateTime) return "—";
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(`${dateTime}:00Z`));
}
