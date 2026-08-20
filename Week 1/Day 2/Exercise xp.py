# Exercise 1: Favorite Numbers
my_fav_numbers = {3, 7, 21}
my_fav_numbers.update({42, 99})
my_fav_numbers.remove(99)

friend_fav_numbers = {5, 7, 13}
our_fav_numbers = my_fav_numbers | friend_fav_numbers
print("Our favorite numbers:", our_fav_numbers)

# Exercise 2: Tuple
numbers = (1, 2, 3)
try:
	numbers += (4, 5)
	print("Updated tuple:", numbers)
except TypeError:
	print("Tuples are immutable and cannot be changed in place.")

# Exercise 3: List Manipulation
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
print("Apples count:", basket.count("Apples"))
basket.clear()
print("Final basket:", basket)

# Exercise 4: Floats
# A float can represent a number with a decimal part; an integer is whole.
mixed_numbers = [number / 2 for number in range(3, 11)]
print("Mixed numbers:", mixed_numbers)

# Exercise 5: For Loop
for number in range(1, 21):
	print(number)

for index, number in enumerate(range(1, 21)):
	if index % 2 == 0:
		print(number)

# Exercise 6: While Loop
while True:
	user_name = input("Enter your name: ").strip()
	if not user_name.isdigit() and len(user_name) >= 3:
		print("Thank you")
		break
	print("Please enter a name with at least 3 letters.")

# Exercise 7: Favorite Fruits
favorite_fruits = input("Enter your favorite fruits, separated by spaces: ").split()
chosen_fruit = input("Enter a fruit: ").strip()
if chosen_fruit in favorite_fruits:
	print("You chose one of your favorite fruits! Enjoy!")
else:
	print("You chose a new fruit. I hope you enjoy it!")

# Exercise 8: Pizza Toppings
toppings = []
while True:
	topping = input("Enter a pizza topping (or 'quit'): ").strip()
	if topping.lower() == "quit":
		break
	toppings.append(topping)
	print(f"Adding {topping} to your pizza.")

total_cost = 10 + len(toppings) * 2.50
print("Toppings:", toppings)
print(f"Total cost: ${total_cost:.2f}")

# Exercise 9: Cinemax Tickets
family_size = int(input("How many family members want a movie ticket? "))
family_ages = []

for person in range(family_size):
	family_ages.append(int(input(f"Enter the age of person {person + 1}: ")))

total_cost = 0
for age in family_ages:
	if age < 3:
		ticket_price = 0
	elif age <= 12:
		ticket_price = 10
	else:
		ticket_price = 15
	total_cost += ticket_price

print(f"Total ticket cost: ${total_cost}")

# Bonus: restricted movie attendees must be between 16 and 21 years old.
teenager_count = int(input("How many people want to see the restricted movie? "))
attendees = []

for person in range(teenager_count):
	age = int(input(f"Enter the age of person {person + 1}: "))
	if 16 <= age <= 21:
		attendees.append(age)

print("Allowed attendees:", attendees)