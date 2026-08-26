# Exercise 1
class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        return f"{self.amount} {self.currency}s"

    def __repr__(self):
        return str(self)

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, int):
            return self.amount + other

        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(
                    f"Cannot add between Currency type <{self.currency}> "
                    f"and <{other.currency}>"
                )
            return self.amount + other.amount

        raise TypeError("Can only add an integer or another Currency")

    def __iadd__(self, other):
        if isinstance(other, int):
            self.amount += other
        elif isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(
                    f"Cannot add between Currency type <{self.currency}> "
                    f"and <{other.currency}>"
                )
            self.amount += other.amount
        else:
            raise TypeError("Can only add an integer or another Currency")

        return self

    
# Exercise 2
def sum_numbers(number1, number2):
    print(number1 + number2)

from func import sum_numbers

sum_numbers(5, 10)

# Exercise 3
import string
import random

letters = string.ascii_letters
random_string = ""

for _ in range(5):
    random_string += random.choice(letters)

print(random_string)

# Exercise 4
from datetime import datetime

def display_current_date():
    print(datetime.now().date())

display_current_date()

# Exercise 5
def time_until_january_first():
    now = datetime.now()
    january_first = datetime(now.year + 1, 1, 1)
    time_left = january_first - now
    print(time_left)

time_until_january_first()

# Exercise 6
def minutes_lived(birthdate):
    birth_date = datetime.strptime(birthdate, "%Y-%m-%d")
    now = datetime.now()
    minutes = int((now - birth_date).total_seconds() / 60)
    print(f"You have lived approximately {minutes:,} minutes.")

minutes_lived("2000-01-01")

# Exercise 7
from faker import Faker

faker = Faker()
users = []

def add_users(number_of_users):
    for _ in range(number_of_users):
        user = {
            "name": faker.name(),
            "address": faker.address(),
            "language_code": faker.language_code()
        }
        users.append(user)

add_users(5)
print(users)
