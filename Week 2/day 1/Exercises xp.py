# Exercise 1
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age


cat1 = Cat("Milo", 3)
cat2 = Cat("Luna", 7)
cat3 = Cat("Oliver", 5)


def find_oldest_cat(cat1, cat2, cat3):
    return max(cat1, cat2, cat3, key=lambda cat: cat.age)


oldest_cat = find_oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")

# Exercise 2
class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high!")


davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Teacup", 20)

print(f"David's dog is {davids_dog.name} and is {davids_dog.height} cm tall.")
davids_dog.bark()
davids_dog.jump()

print(f"Sarah's dog is {sarahs_dog.name} and is {sarahs_dog.height} cm tall.")
sarahs_dog.bark()
sarahs_dog.jump()

if davids_dog.height > sarahs_dog.height:
    print(f"David's dog, {davids_dog.name}, is bigger.")
elif sarahs_dog.height > davids_dog.height:
    print(f"Sarah's dog, {sarahs_dog.name}, is bigger.")
else:
    print("Both dogs are the same size.")

# Exercise 3
class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)


stairway = Song([
    "There’s a lady who's sure",
    "all that glitters is gold",
    "and she’s buying a stairway to heaven"
])

stairway.sing_me_a_song()

# Exercise 4
class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []
        self.groups = {}

    def add_animal(self, *new_animals):
        for animal in new_animals:
            if animal not in self.animals:
                self.animals.append(animal)

    def get_animals(self):
        for animal in self.animals:
            print(animal)

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)

    def sort_animals(self):
        self.animals.sort()
        self.groups = {}

        for animal in self.animals:
            first_letter = animal[0].upper()
            self.groups.setdefault(first_letter, []).append(animal)

        return self.groups

    def get_groups(self):
        for letter, animals in self.groups.items():
            print(f"{letter}: {animals}")


brooklyn_safari = Zoo("Brooklyn Safari")

brooklyn_safari.add_animal("Giraffe", "Bear", "Baboon", "Lion", "Zebra", "Cat", "Cougar")
brooklyn_safari.add_animal("Bear")

brooklyn_safari.get_animals()

brooklyn_safari.sell_animal("Bear")
print("\nAfter selling Bear:")
brooklyn_safari.get_animals()

brooklyn_safari.sort_animals()
print("\nAnimal groups:")
brooklyn_safari.get_groups()

