# Exercise 1
manufacturers_text = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
manufacturers = manufacturers_text.split(", ")

print("Number of manufacturers:", len(manufacturers))
print("Manufacturers Z-A:", sorted(manufacturers, reverse=True))

count_o = sum("o" in manufacturer.lower() for manufacturer in manufacturers)
count_without_i = sum("i" not in manufacturer.lower() for manufacturer in manufacturers)

print("Names containing 'o':", count_o)
print("Names without 'i':", count_without_i)

duplicate_manufacturers = [
    "Honda", "Volkswagen", "Toyota", "Ford Motor",
    "Honda", "Chevrolet", "Toyota"
]

unique_manufacturers = list(dict.fromkeys(duplicate_manufacturers))

print("Without duplicates:", ", ".join(unique_manufacturers))
print("Number of unique companies:", len(unique_manufacturers))

reversed_names = [
    manufacturer[::-1]
    for manufacturer in sorted(unique_manufacturers)
]

print("A-Z with reversed names:", reversed_names)
