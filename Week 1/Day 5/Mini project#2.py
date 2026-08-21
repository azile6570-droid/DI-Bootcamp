# HANGMAN
import random

wordslist = [
    "correction",
    "childish",
    "beach",
    "python",
    "assertive",
    "interference",
    "complete",
    "share",
    "credit card",
    "rush",
    "south",
]

word = random.choice(wordslist)
guessed_letters = set()
wrong_guesses = 0

body_parts = [
    "head",
    "body",
    "left arm",
    "right arm",
    "left leg",
    "right leg",
]

displayed_word = [
    letter if letter == " " else "*"
    for letter in word
]

print("Welcome to Hangman!")
print(" ".join(displayed_word))

while wrong_guesses < 6 and "*" in displayed_word:
    guess = input("\nGuess a letter: ").lower().strip()

    if len(guess) != 1 or not guess.isalpha():
        print("Please enter one letter.")
        continue

    if guess in guessed_letters:
        print("You already guessed that letter.")
        continue

    guessed_letters.add(guess)

    if guess in word:
        for index, letter in enumerate(word):
            if letter == guess:
                displayed_word[index] = guess

        print("Correct!")
    else:
        print("Incorrect!")
        print(f"The {body_parts[wrong_guesses]} has been added.")
        wrong_guesses += 1

    print(" ".join(displayed_word))
    print(f"Incorrect guesses: {wrong_guesses}/6")

if "*" not in displayed_word:
    print(f"\nCongratulations! You guessed the word: {word}")
else:
    print(f"\nGame over! The word was: {word}")
