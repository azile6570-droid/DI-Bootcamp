# Weather App
import os
from collections import defaultdict
from datetime import datetime

import matplotlib.pyplot as plt # type: ignore
from pyowm import OWM # type: ignore


API_KEY = os.getenv("OWM_API_KEY")

if not API_KEY:
    raise ValueError("Please set the OWM_API_KEY environment variable.")

owm = OWM(API_KEY)
weather_manager = owm.weather_manager()
air_pollution_manager = owm.airpollution_manager()


def display_weather(city_id, city_name):
    observation = weather_manager.weather_at_id(city_id)
    weather = observation.weather
    location = observation.location

    print(f"\nWeather in {city_name}")
    print("-" * 30)
    print(f"Temperature: {weather.temperature('celsius')['temp']:.1f}°C")
    print(f"Status: {weather.detailed_status.title()}")
    print(f"Wind: {weather.wind()['speed']} m/s")
    print(f"Wind direction: {weather.wind().get('deg', 'N/A')}°")
    print(
        "Sunrise:",
        weather.sunrise_time(timeformat="iso"),
    )
    print(
        "Sunset:",
        weather.sunset_time(timeformat="iso"),
    )

    pollution = air_pollution_manager.airpollution_at_coords(
        location.lat(),
        location.lon(),
    )

    print(f"Air Quality Index: {pollution.get_airquality_index()}")
    print(f"PM2.5: {pollution.pm2_5()} μg/m³")
    print(f"PM10: {pollution.pm10()} μg/m³")


def get_city_id(city_name, country_code=""):
    registry = owm.city_id_registry()
    cities = registry.ids_for(city_name, country=country_code)

    if not cities:
        return None

    return cities[0][0]


def display_forecast(city_id):
    forecast = weather_manager.forecast_at_id(city_id, "3h")

    print("\nFive-day forecast")
    print("-" * 30)

    for weather in forecast.weathers:
        temperature = weather.temperature("celsius")["temp"]
        print(
            f"{weather.reference_time(timeformat='iso')}: "
            f"{weather.detailed_status.title()}, "
            f"{temperature:.1f}°C, "
            f"humidity {weather.humidity}%"
        )


def init_plot():
    figure, axis = plt.subplots()
    axis.set_ylabel("Average humidity (%)")
    axis.set_title("Three-day humidity forecast")
    return figure, axis


def write_humidity_on_bar_chart(axis, bars, values):
    for bar, value in zip(bars, values):
        axis.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height(),
            f"{value:.0f}%",
            ha="center",
            va="bottom",
        )


def plot_temperatures(city_id):
    forecast = weather_manager.forecast_at_id(city_id, "3h")
    humidity_by_day = defaultdict(list)

    for weather in forecast.weathers:
        date = weather.reference_time(timeformat="datetime").date()
        humidity_by_day[date].append(weather.humidity)

    days = sorted(humidity_by_day)[:3]
    labels = [day.strftime("%a %d") for day in days]
    values = [
        sum(humidity_by_day[day]) / len(humidity_by_day[day])
        for day in days
    ]

    figure, axis = init_plot()
    bars = axis.bar(labels, values, color="skyblue")
    axis.set_ylim(0, 100)
    write_humidity_on_bar_chart(axis, bars, values)

    figure.tight_layout()
    plt.show()


def main():
    paris_id = get_city_id("Paris", "FR")

    if paris_id is not None:
        display_weather(paris_id, "Paris")
        display_forecast(paris_id)
        plot_temperatures(paris_id)

    city = input("\nEnter a city: ").strip()
    country = input("Enter the country code, e.g. FR: ").strip().upper()

    city_id = get_city_id(city, country)

    if city_id is None:
        print("City not found.")
        return

    print(f"City ID: {city_id}")
    display_weather(city_id, city)
    display_forecast(city_id)
    plot_temperatures(city_id)


if __name__ == "__main__":
    main()