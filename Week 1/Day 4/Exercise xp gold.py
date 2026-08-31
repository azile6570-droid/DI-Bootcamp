# Exercise 1
CURRENT_YEAR = 2026
CURRENT_MONTH = 8
CURRENT_DAY = 20


def get_age(year, month, day):
    age = CURRENT_YEAR - year

    if (CURRENT_MONTH, CURRENT_DAY) < (month, day):
        age -= 1

    return age


def can_retire(gender, date_of_birth):
    year, month, day = date_of_birth
    age = get_age(year, month, day)

    retirement_age = 67 if gender == "m" else 62
    return age >= retirement_age


gender = input("Enter your gender (m/f): ").lower()
birthdate = input("Enter your date of birth (yyyy/mm/dd): ")

year, month, day = map(int, birthdate.split("/"))

if can_retire(gender, (year, month, day)):
    print("You can retire.")
else:
    print("You cannot retire yet.")

# Exercise 2
# Exercise 2
def sum_number_patterns(x):
    x = str(x)
    return sum(int(x * multiplier) for multiplier in range(1, 5))


print(sum_number_patterns(3))

# Exercise 3
import random


def throw_dice():
    return random.randint(1, 6)


def throw_until_doubles():
    throws = 0

    while True:
        first_dice = throw_dice()
        second_dice = throw_dice()
        throws += 1

        if first_dice == second_dice:
            return throws


def main():
    results = [throw_until_doubles() for _ in range(100)]
    total_throws = sum(results)
    average_throws = total_throws / len(results)

    print(f"Total throws: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws:.2f}")


main()