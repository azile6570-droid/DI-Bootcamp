# Exercise 1
items = ["apple", "banana", "cherry", "mango"]

index = int(input("Enter the index: "))
item = input("Enter the item: ")

items.insert(index, item)

print(items)

# Exercise 2
text = input("Enter a string: ")
space_count = text.count(" ")

print(f"The string contains {space_count} space(s).")

# Exercise 3
text = input("Enter a string: ")
uppercase = 0
lowercase = 0

for character in text:
    if character.isupper():
        uppercase += 1
    elif character.islower():
        lowercase += 1

print(f"Uppercase letters: {uppercase}")
print(f"Lowercase letters: {lowercase}")


# Exercise 4
def my_sum(numbers):
    total = 0
    for number in numbers:
        total += number
    return total


# Exercise 5
def find_max(numbers):
    maximum = numbers[0]
    for number in numbers:
        if number > maximum:
            maximum = number
    return maximum


# Exercise 6
def factorial(number):
    result = 1
    for value in range(1, number + 1):
        result *= value
    return result


# Exercise 7
def list_count(items, element):
    total = 0
    for item in items:
        if item == element:
            total += 1
    return total


# Exercise 8
def norm(numbers):
    total = 0
    for number in numbers:
        total += number ** 2
    return total ** 0.5


# Exercise 9
def is_mono(numbers):
    ascending = all(numbers[i] <= numbers[i + 1] for i in range(len(numbers) - 1))
    descending = all(numbers[i] >= numbers[i + 1] for i in range(len(numbers) - 1))
    return ascending or descending


# Exercise 10
def longest_word(words):
    longest = max(words, key=len)
    print(longest)


# Exercise 11
def separate_types(items):
    integers = []
    strings = []

    for item in items:
        if type(item) is int:
            integers.append(item)
        elif type(item) is str:
            strings.append(item)

    return integers, strings


# Exercise 12
def is_palindrome(text):
    return text == text[::-1]


# Exercise 13
def sum_over_k(sentence, k):
    return sum(len(word) > k for word in sentence.split())


# Exercise 14
def dict_avg(dictionary):
    return sum(dictionary.values()) / len(dictionary)


# Exercise 15
def common_div(number1, number2):
    divisors = []

    for number in range(1, min(number1, number2) + 1):
        if number1 % number == 0 and number2 % number == 0:
            divisors.append(number)

    return divisors[1:]


# Exercise 16
def is_prime(number):
    if number < 2:
        return False

    for divisor in range(2, int(number ** 0.5) + 1):
        if number % divisor == 0:
            return False

    return True


# Exercise 17
def weird_print(items):
    result = []

    for index, value in enumerate(items):
        if index % 2 == 0 and value % 2 == 0:
            result.append(value)

    print(result)


# Exercise 18
def type_count(**kwargs):
    counts = {}

    for value in kwargs.values():
        type_name = type(value).__name__
        counts[type_name] = counts.get(type_name, 0) + 1

    return ", ".join(f"{key}: {value}" for key, value in counts.items())


# Exercise 19
def custom_split(text, separator=None):
    result = []
    current_word = ""

    for character in text:
        if separator is None:
            is_separator = character.isspace()
        else:
            is_separator = character == separator

        if is_separator:
            if current_word:
                result.append(current_word)
                current_word = ""
        else:
            current_word += character

    if current_word:
        result.append(current_word)

    return result


# Exercise 20
def password_format(password):
    return "*" * len(password)
