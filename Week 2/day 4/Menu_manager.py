import json
from pathlib import Path


class MenuManager:
    def __init__(self):
        self.file_path = Path(__file__).parent / "restaurant_menu.json"

        with self.file_path.open("r", encoding="utf-8") as file:
            self.menu = json.load(file)

    def add_item(self, name, price):
        self.menu["items"].append({
            "name": name,
            "price": price
        })

    def remove_item(self, name):
        for index, item in enumerate(self.menu["items"]):
            if item["name"].lower() == name.lower():
                del self.menu["items"][index]
                return True

        return False

    def save_to_file(self):
        with self.file_path.open("w", encoding="utf-8") as file:
            json.dump(self.menu, file, indent=4)
