# Exercise 1
import math
import random
import re

c = 50
h = 30
distances = input("Enter comma-separated distances: ").split(",")
results = [str(int(math.sqrt((2 * c * int(distance.strip())) / h))) for distance in distances]
print(",".join(results))

# Exercise 2
numbers = [3, 47, 99, -80, 22, 97, 54, -23, 5, 7]
print("Numbers:", numbers)
print("Descending:", sorted(numbers, reverse=True))
print("Sum:", sum(numbers))
print("First and last:", [numbers[0], numbers[-1]])
print("Greater than 50:", [number for number in numbers if number > 50])
print("Smaller than 10:", [number for number in numbers if number < 10])
print("Squared:", [number ** 2 for number in numbers])
unique_numbers = list(dict.fromkeys(numbers))
print("Without duplicates:", unique_numbers)
print("Unique count:", len(unique_numbers))
print("Average:", sum(numbers) / len(numbers))
print("Largest:", max(numbers))
print("Smallest:", min(numbers))

manual_sum = 0
manual_largest = numbers[0]
manual_smallest = numbers[0]
for number in numbers:
	manual_sum += number
	if number > manual_largest:
		manual_largest = number
	if number < manual_smallest:
		manual_smallest = number
print("Manual sum:", manual_sum)
print("Manual average:", manual_sum / len(numbers))
print("Manual largest:", manual_largest)
print("Manual smallest:", manual_smallest)

random_numbers = [random.randint(-100, 100) for _ in range(random.randint(50, 100))]
print("Random list count:", len(random_numbers))

# Exercise 3
paragraph = (
	"Learning Python rewards curiosity. Small experiments reveal how programs work, "
	"while careful practice turns ideas into useful tools."
)
sentences = [sentence for sentence in re.split(r"(?<=[.!?])\s+", paragraph) if sentence]
words = re.findall(r"\b[\w']+\b", paragraph.lower())
unique_words = set(words)
non_whitespace_characters = len(re.sub(r"\s", "", paragraph))
print("Characters:", len(paragraph))
print("Sentences:", len(sentences))
print("Words:", len(words))
print("Unique words:", len(unique_words))
print("Non-whitespace characters:", non_whitespace_characters)
print("Average words per sentence:", len(words) / len(sentences))
print("Non-unique words:", len(words) - len(unique_words))

# Exercise 4
text = input("Enter a sentence: ")
frequency = {}
for word in text.split():
	frequency[word] = frequency.get(word, 0) + 1
for word in sorted(frequency):
	print(f"{word}:{frequency[word]}")