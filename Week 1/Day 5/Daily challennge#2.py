# Advanced algorithm
import random

list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728

number_counts = {}

for number in list_of_numbers:
    number_counts[number] = number_counts.get(number, 0) + 1

pairs = set()

for number in number_counts:
    complement = target_number - number

    if complement in number_counts:
        if number != complement or number_counts[number] >= 2:
            pairs.add(tuple(sorted((number, complement))))

for first, second in sorted(pairs):
    print(f"{first} and {second} sums to the target number {target_number}")
