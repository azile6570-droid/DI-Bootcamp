# Exercise 1
birthdays = {
    "Alice": "1995/04/12",
    "Bob": "1990/08/25",
    "Charlie": "2001/01/30",
    "Diana": "1988/11/07",
    "Ethan": "1997/06/18"
}

print("Welcome!")
print("You can look up the birthdays of the people in the list!")

name = input("Enter a person's name: ")

if name in birthdays:
    print(f"{name}'s birthday is {birthdays[name]}.")
else:
    print("Sorry, that person is not in the birthday list.")

# Exercise 2
print("Available names:")
for person in birthdays:
    print(person)

name = input("Enter a person's name: ")

if name in birthdays:
    print(f"{name}'s birthday is {birthdays[name]}.")
else:
    print(f"Sorry, we don't have the birthday information for {name}.")

# Exercise 3
new_name = input("Enter a person's name to add: ")
new_birthday = input("Enter their birthday (YYYY/MM/DD): ")

birthdays[new_name] = new_birthday

print("Available names:")
for person in birthdays:
    print(person)

lookup_name = input("Enter a person's name to look up: ")

if lookup_name in birthdays:
    print(f"{lookup_name}'s birthday is {birthdays[lookup_name]}.")
else:
    print(
        f"Sorry, we don't have the birthday information for {lookup_name}."
    )

# Exercise 4
items = {
    "banana": 4,
    "apple": 2,
    "orange": 1.5,
    "pear": 3
}

for item, price in items.items():
    print(f"The price of {item} is ${price}.")

items = {
    "banana": {"price": 4, "stock": 10},
    "apple": {"price": 2, "stock": 5},
    "orange": {"price": 1.5, "stock": 24},
    "pear": {"price": 3, "stock": 1}
}

total_cost = sum(
    details["price"] * details["stock"]
    for details in items.values()
)

print(f"The total cost of all items in stock is ${total_cost}.")


