# Challenge 1
number = int(input("Enter a number: "))
length = int(input("Enter the length: "))

multiples = [number * multiplier for multiplier in range(1, length + 1)]
print(multiples)

# Challenge 2
word = input("Enter a string: ")
compressed_word = ""

for character in word:
	if not compressed_word or character != compressed_word[-1]:
		compressed_word += character

print(compressed_word)
