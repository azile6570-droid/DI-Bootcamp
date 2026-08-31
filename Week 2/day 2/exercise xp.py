# Exercise 1
class Pets:
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())


class Cat:
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f"{self.name} is just walking around"


class Bengal(Cat):
    def sing(self, sounds):
        return sounds


class Chartreux(Cat):
    def sing(self, sounds):
        return sounds


class Siamese(Cat):
    pass


bengal_obj = Bengal("Leo", 3)
chartreux_obj = Chartreux("Milo", 5)
siamese_obj = Siamese("Luna", 2)

all_cats = [bengal_obj, chartreux_obj, siamese_obj]
sara_pets = Pets(all_cats)

sara_pets.walk()

# Exercise 2
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if power > other_power:
            return f"{self.name} won the fight"
        elif power < other_power:
            return f"{other_dog.name} won the fight"
        return "The fight is a tie"


dog1 = Dog("Max", 3, 20)
dog2 = Dog("Rocky", 5, 25)
dog3 = Dog("Buddy", 2, 15)

print(dog1.bark())
print(dog2.run_speed())
print(dog1.fight(dog2))
print(dog3.fight(dog1))

# Exercise 3
import random


class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        dog_names = [dog.name for dog in args]
        dog_names.append(self.name)
        print(f"{', '.join(dog_names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                "does a barrel roll",
                "stands on his back legs",
                "shakes your hand",
                "plays dead",
            ]
            print(f"{self.name} {random.choice(tricks)}")


my_dog = PetDog("Fido", 2, 10)
buddy = PetDog("Buddy", 3, 12)
max_dog = PetDog("Max", 4, 15)

my_dog.train()
my_dog.play(buddy, max_dog)
my_dog.do_a_trick()

# Exercise 4.
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18
class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        person = Person(first_name, age)
        person.last_name = self.last_name
        self.members.append(person)

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print(
                        "You are over 18, your parents Jane and John "
                        "accept that you will go out with your friends"
                    )
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return

    def family_presentation(self):
        print(f"The {self.last_name} family:")
        for member in self.members:
            print(f"{member.first_name}, {member.age} years old")
my_family = Family("Smith")
my_family.born("Jane", 45)
my_family.born("John", 46)
my_family.born("Emma", 16)
my_family.born("Liam", 20)

my_family.check_majority("Emma")
my_family.check_majority("Liam")
my_family.family_presentation()



