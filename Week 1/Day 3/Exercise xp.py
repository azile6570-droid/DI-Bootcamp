# Exercise 1
keys = ["Ten","Twenty","Thirty"]
values = [10,20,30]
result = dict(zip(keys, values))
print(result)

# Exercise 2
family = {"rick": 43, "beth": 13, "morty": 5, "summer":8}
total_cost = 0
for name, age in family.items():
    if age < 3:
        price = 0
    elif age <= 12:
        price = 10
    else:
        price = 15
        print (f"total cost: ${price}")
        total_cost += price
        print(f"total cost: ${total_cost}")

# Exercise 3
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": ["blue"],
        "Spain": ["red"],
        "US": ["pink", "green"]
    }
}

brand["number_stores"] = 2

print(f"Zara clients include: {', '.join(brand['type_of_clothes'])}.")
brand["country_creation"] = "Spain"

if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

brand.pop("creation_date")

print("Last competitor:", brand["international_competitors"][-1])
print("US major colors:", brand["major_color"]["US"])
print("Number of keys:", len(brand))
print("All keys:", list(brand.keys()))

more_on_zara = {
    "creation_date": 1975,
    "number_stores": 7000
}

brand.update(more_on_zara)
print(brand)

# Exercise 4
users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

characters_to_indices = {character: index for index, character in enumerate(users)}
indices_to_characters = {index: character for index, character in enumerate(users)}

sorted_characters_to_indices = {
    character: index for index, character in enumerate(sorted(users))
}

print(characters_to_indices)
print(indices_to_characters)
print(sorted_characters_to_indices)
