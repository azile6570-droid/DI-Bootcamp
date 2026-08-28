from Anagram_checker import AnagramChecker


def main():
    checker = AnagramChecker()

    while True:
        print("\n--- Anagram Checker ---")
        print("1. Find anagrams")
        print("2. Exit")

        choice = input("Choose an option: ").strip()

        if choice == "2":
            print("Goodbye!")
            break

        if choice != "1":
            print("Invalid choice.")
            continue

        word = input("Enter a word: ").strip()

        if not word.isalpha():
            print("Please enter letters only.")
            continue

        is_valid = checker.is_valid_word(word)

        print(f"\nYour word: {word}")
        print(f"Valid word: {'Yes' if is_valid else 'No'}")

        if is_valid:
            anagrams = checker.get_anagrams(word)

            if anagrams:
                print(f"Anagrams: {', '.join(anagrams)}")
            else:
                print("No anagrams found.")
        else:
            print("The word is not in the word list.")


if __name__ == "__main__":
    main()
