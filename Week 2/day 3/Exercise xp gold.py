# Exercise 1
from datetime import date
def display_upcoming_holiday():
    today = date.today()
    print(f"Today's date: {today.strftime('%B %d, %Y')}")

    us_holidays = 'holidays'.US(years=[today.year, today.year + 1])

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

# Exercise 3
import re


def return_numbers(text):
    return "".join(re.findall(r"\d", text))


print(return_numbers("k5k3q2g5z6x9bn"))

# Exercise 4
import re


def is_valid_full_name(full_name):
    pattern = r"^[A-Z][a-z]+ [A-Z][a-z]+$"
    return bool(re.fullmatch(pattern, full_name))


name = input("Enter your full name: ")

if is_valid_full_name(name):
    print("Valid name.")
else:
    print("Invalid name.")


# Exercise 5
import random
import secrets
import string


def test_password(password, length):
    assert len(password) == length
    assert re.search(r"[0-9]", password)
    assert re.search(r"[a-z]", password)
    assert re.search(r"[A-Z]", password)
    assert re.search(r"[^a-zA-Z0-9]", password)


def generate_password(length):
    characters = string.ascii_letters + string.digits + "!@#$%^_&*"
    password = [
        secrets.choice(string.digits),
        secrets.choice(string.ascii_lowercase),
        secrets.choice(string.ascii_uppercase),
        secrets.choice("!@#$%^_&*"),
    ]

    password += [
        secrets.choice(characters)
        for _ in range(length - 4)
    ]

    random.shuffle(password)
    return "".join(password)


for _ in range(100):
    password_length = random.randint(6, 30)
    password = generate_password(password_length)
    test_password(password, password_length)

print("All 100 password tests passed.")

while True:
    try:
        password_length = int(input("Choose a password length (6-30): "))

        if 6 <= password_length <= 30:
            break

        print("Please enter a number between 6 and 30.")
    except ValueError:
        print("Please enter a valid number.")

password = generate_password(password_length)
print(f"Your password is: {password}")
print("Keep your password in a safe place!")

