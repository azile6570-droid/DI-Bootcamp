# Exercise 1
import json
import re
from pathlib import Path


menu_file = Path(__file__).parent / "restaurant_menu.json"

with menu_file.open("r", encoding="utf-8") as file:
    menu = json.load(file)

menu.setdefault("valentines_items", [])

connection_words = {"of", "and", "the", "in", "with", "for"}


def valid_item_name(name):
    words = name.split()

    if not words or not words[0].startswith("V"):
        return False

    if len(re.findall(r"e", name, re.IGNORECASE)) < 2:
        return False

    if re.search(r"\d", name):
        return False

    for word in words:
        clean_word = word.strip(".,!?")
        first_letter = clean_word[0]

        if clean_word.lower() in connection_words:
            if not clean_word.islower():
                return False
        elif not first_letter.isupper():
            return False

    return True


def valid_price(price):
    return re.fullmatch(r"\d{2},14", price) is not None


def display_heart():
    print("  *   *  ")
    print(" * * * * ")
    print("*   *   *")
    print(" *     * ")
    print("  *   *  ")
    print("    *    ")


item_name = input("Enter the Valentine's item name: ")
item_price = input("Enter the price (XX,14): ")

if valid_item_name(item_name) and valid_price(item_price):
    menu["valentines_items"].append({
        "name": item_name,
        "price": item_price
    })

    with menu_file.open("w", encoding="utf-8") as file:
        json.dump(menu, file, indent=4)

    print("Valentine's item added successfully.")
else:
    print("Invalid item name or price.")

print("\nRestaurant menu:")
display_heart()

for item in menu.get("items", []):
    print(f"{item['name']} - {item['price']}")

print("\nValentine's menu:")
for item in menu["valentines_items"]:
    print(f"{item['name']} - {item['price']}")

# Exercise 2
import json
import random


class Character:
    abilities = [
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma",
    ]

    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.attributes = self.generate_attributes()

    @staticmethod
    def roll_attribute():
        dice = [random.randint(1, 6) for _ in range(4)]
        return sum(sorted(dice)[1:])

    def generate_attributes(self):
        return {
            ability: self.roll_attribute()
            for ability in self.abilities
        }

    def to_dict(self):
        return {
            "name": self.name,
            "age": self.age,
            "attributes": self.attributes,
        }


class Game:
    def __init__(self):
        self.characters = []

    def create_characters(self):
        number_of_players = int(input("How many players are playing? "))

        for player_number in range(1, number_of_players + 1):
            print(f"\nPlayer {player_number}")
            name = input("Enter your character's name: ")
            age = int(input("Enter your character's age: "))

            self.characters.append(Character(name, age))

    def export_json(self):
        with open("characters.json", "w", encoding="utf-8") as file:
            json.dump(
                [character.to_dict() for character in self.characters],
                file,
                indent=4,
            )

    def export_txt(self):
        with open("characters.txt", "w", encoding="utf-8") as file:
            for character in self.characters:
                file.write(f"Character: {character.name}\n")
                file.write(f"Age: {character.age}\n")

                for ability, score in character.attributes.items():
                    file.write(f"{ability}: {score}\n")

                file.write("\n")

    def start(self):
        self.create_characters()
        self.export_json()
        self.export_txt()
        print("\nCharacters saved to characters.json and characters.txt.")


game = Game()
game.start()

