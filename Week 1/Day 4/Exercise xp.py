# Exercise 1
def display_message():
    print("I am learning about functions in Python.")


display_message()

# Exercise 2
def favorite_book(title):
    print(f"One of my favorite books is {title}.")


favorite_book("Alice in Wonderland")

# Exercise 3
def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")


describe_city("Reykjavik", "Iceland")
describe_city("Paris")

# Exercise 4
def random_numbers(number):
    random_number = 'random'.randint(1, 100)

    if number == random_number:
        print("Success!")
    else:
        print(f"Fail! Your number: {number}, Random number: {random_number}")


random_numbers(50)

# Exercise 5
def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}.")


make_shirt()
make_shirt(size="medium")
make_shirt(size="small", text="Custom message")


# Exercise 6
magician_names = ["Harry Houdini", "David Blaine", "Criss Angel"]


def show_magicians(magician_names):
    for magician in magician_names:
        print(magician)


def make_great(magician_names):
    for index in range(len(magician_names)):
        magician_names[index] += " the Great"


make_great(magician_names)
show_magicians(magician_names)


