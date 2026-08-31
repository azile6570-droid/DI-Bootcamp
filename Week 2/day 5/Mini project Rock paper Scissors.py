# Rock paper scissors
import random


class Game:
    items = ("rock", "paper", "scissors")

    def get_user_item(self):
        while True:
            choice = input("Choose rock, paper, or scissors: ").strip().lower()

            if choice in self.items:
                return choice

            print("Invalid choice. Please try again.")

    def get_computer_item(self):
        return random.choice(self.items)

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"

        winning_choices = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper",
        }

        return "win" if winning_choices[user_item] == computer_item else "loss"

    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)

        print(f"Your choice: {user_item}")
        print(f"Computer's choice: {computer_item}")
        print(f"Result: {result}")

        return result
from game import Game # type: ignore


def get_user_menu_choice():
    while True:
        print("\n--- Rock Paper Scissors ---")
        print("1. Play a new game")
        print("2. Show scores")
        print("3. Quit")

        choice = input("Choose an option: ").strip()

        if choice in {"1", "2", "3"}:
            return choice

        print("Invalid choice. Please select 1, 2, or 3.")


def print_results(results):
    print("\n--- Game Summary ---")
    print(f"Wins: {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws: {results['draw']}")
    print("Thank you for playing!")


def main():
    results = {
        "win": 0,
        "loss": 0,
        "draw": 0,
    }

    while True:
        choice = get_user_menu_choice()

        if choice == "1":
            result = Game().play()
            results[result] += 1
        elif choice == "2":
            print_results(results)
        else:
            print_results(results)
            break


if __name__ == "__main__":
    main()
