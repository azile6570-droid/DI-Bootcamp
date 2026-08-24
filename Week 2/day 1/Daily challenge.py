# Old McDonalds Farm
class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **animals):
        if animal_type is not None:
            animals[animal_type] = count

        for name, quantity in animals.items():
            self.animals[name] = self.animals.get(name, 0) + quantity

    def get_info(self):
        animal_info = "\n".join(
            f"# {animal:<6}: {count}"
            for animal, count in self.animals.items()
        )

        return f"# {self.name}'s farm\n\n{animal_info}\n\n#     E-I-E-I-0!"

    def get_animal_types(self):
        return sorted(self.animals.keys())

    def get_short_info(self):
        animal_types = self.get_animal_types()
        animal_names = [
            animal + "s" if self.animals[animal] > 1 else animal
            for animal in animal_types
        ]

        if len(animal_names) == 1:
            animals_text = animal_names[0]
        elif len(animal_names) == 2:
            animals_text = " and ".join(animal_names)
        else:
            animals_text = ", ".join(animal_names[:-1])
            animals_text += f" and {animal_names[-1]}"

        return f"{self.name}'s farm has {animals_text}."


macdonald = Farm("McDonald")
macdonald.add_animal("cow", 5)
macdonald.add_animal("sheep")
macdonald.add_animal("sheep")
macdonald.add_animal("goat", 12)

print(macdonald.get_info())
print(macdonald.get_short_info())

# Bonus: add multiple animals using keyword arguments
macdonald.add_animal(cow=5, sheep=2, goat=12)
