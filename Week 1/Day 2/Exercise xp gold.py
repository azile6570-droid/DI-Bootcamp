# Exercise 1
first_list = [1, 2, 3]
second_list = [4, 5, 6]
concatenated_list = first_list.copy()
concatenated_list.extend(second_list)
print("Concatenated list:", concatenated_list)

# Exercise 2
for number in range(1500, 2501):
	if number % 5 == 0 and number % 7 == 0:
		print(number)

# Exercise 3
names = ["Samus", "Cortana", "V", "Link", "Mario", "Cortana", "Samus"]
searched_name = input("Enter a name: ")
if searched_name in names:
	print(names.index(searched_name))
else:
	print(f"{searched_name} was not found in the list.")

# Exercise 4
numbers = [
	float(input("Input the 1st number: ")),
	float(input("Input the 2nd number: ")),
	float(input("Input the 3rd number: ")),
]
print("The greatest number is:", max(numbers))

# Exercise 5
alphabet = "abcdefghijklmnopqrstuvwxyz"
for letter in alphabet:
	if letter in "aeiou":
		print(f"{letter} is a vowel.")
	else:
		print(f"{letter} is a consonant.")

# Exercise 6
words = []
for word_number in range(1, 8):
	words.append(input(f"Enter word {word_number}: "))
letter = input("Enter one character: ")
for word in words:
	if letter in word:
		print(f"The first '{letter}' in '{word}' is at index {word.index(letter)}.")
	else:
		print(f"The letter '{letter}' is not in '{word}'.")

# Exercise 7
one_to_million = list(range(1, 1_000_001))
print("Minimum:", min(one_to_million))
print("Maximum:", max(one_to_million))
print("Sum:", sum(one_to_million))

# Exercise 8
number_sequence = input("Enter comma-separated numbers: ").split(",")
print(number_sequence)
print(tuple(number_sequence))

# Exercise 9
import random

wins = 0
losses = 0
while True:
	guess = input("Guess a number from 1 to 9 (or type 'quit'): ").strip()
	if guess.lower() == "quit":
		break
	if not guess.isdigit() or not 1 <= int(guess) <= 9:
		print("Please enter a whole number from 1 to 9.")
		continue
	if int(guess) == random.randint(1, 9):
		print("Winner")
		wins += 1
	else:
		print("Better luck next time")
		losses += 1

print(f"Games won: {wins}; games lost: {losses}")