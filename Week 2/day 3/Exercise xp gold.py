# Exercise 1
from datetime import date
import holidays
def display_upcoming_holiday():
    today = date.today()
    print(f"Today's date: {today.strftime('%B %d, %Y')}")

    us_holidays = holidays.US(years=[today.year, today.year + 1])

    upcoming_holidays = sorted(
        holiday_date for holiday_date in us_holidays if holiday_date > today
    )

    next_holiday_date = upcoming_holidays[0]
    next_holiday_name = us_holidays[next_holiday_date]
    days_left = (next_holiday_date - today).days

    print(
        f"The next holiday is {next_holiday_name} "
        f"in {days_left} days."
    )


display_upcoming_holiday

# Exercise 2
def calculate_planet_ages(age_in_seconds):
    if age_in_seconds < 0:
        raise ValueError("Age cannot be negative.")

    earth_years = age_in_seconds / 31_557_600

    orbital_periods = {
        "Earth": 1,
        "Mercury": 0.2408467,
        "Venus": 0.61519726,
        "Mars": 1.8808158,
        "Jupiter": 11.862615,
        "Saturn": 29.447498,
        "Uranus": 84.016846,
        "Neptune": 164.79132,
    }

    for planet, orbital_period in orbital_periods.items():
        planet_age = earth_years / orbital_period
        print(f"Age on {planet}: {planet_age:.2f} years")


calculate_planet_ages(1_000_000_000)