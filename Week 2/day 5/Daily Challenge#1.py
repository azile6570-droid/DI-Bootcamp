# EXERCISE 1

# What is a class?
# A class is a blueprint used to create objects.

# What is an instance?
# An instance is an object created from a class.

# What is encapsulation?
# Encapsulation groups data and methods together and controls access to them.

# What is abstraction?
# Abstraction hides implementation details and shows only essential features.

# What is inheritance?
# Inheritance allows a class to reuse and extend another class's functionality.

# What is multiple inheritance?
# Multiple inheritance allows a class to inherit from more than one parent class.

# What is polymorphism?
# Polymorphism allows different classes to use the same method name with different behavior.

# What is method resolution order (MRO)?
# MRO is the order Python follows when searching for methods and attributes
# in a class and its parent classes.


# EXERCISE 2
import random


class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __str__(self):
        return f"{self.value} of {self.suit}"


class Deck:
    suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
    values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

    def __init__(self):
        self.cards = [
            Card(suit, value)
            for suit in self.suits
            for value in self.values
        ]

    def shuffle(self):
        if len(self.cards) != 52:
            raise ValueError("The deck must contain all 52 cards before shuffling.")

        random.shuffle(self.cards)

    def deal(self):
        if not self.cards:
            return None

        return self.cards.pop()


deck = Deck()
deck.shuffle()

card = deck.deal()
print(f"Dealt card: {card}")
print(f"Cards remaining: {len(deck.cards)}")

