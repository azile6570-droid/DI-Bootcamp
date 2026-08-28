# Exercise 1
import random
from pathlib import Path


WORDS_FILE = Path(__file__).parent / "words.txt"


def get_words_from_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return file.read().split()


def get_random_sentence(length):
    words = get_words_from_file(WORDS_FILE)
    selected_words = [random.choice(words) for _ in range(length)]
    return " ".join(selected_words).lower()


def main():
    print("This program generates a random sentence.")

    try:
        length = int(input("Enter the sentence length (2-20): "))

        if not 2 <= length <= 20:
            print("Error: length must be between 2 and 20.")
            return

        sentence = get_random_sentence(length)
        print(f"\nGenerated sentence:\n{sentence}")

    except ValueError:
        print("Error: please enter a valid integer.")


if __name__ == "__main__":
    main()
# Exercise 2
import json
from pathlib import Path


sample_json = """{
    "company": {
        "employee": {
            "name": "emma",
            "payable": {
                "salary": 7000,
                "bonus": 800
            }
        }
    }
}"""

data = json.loads(sample_json)

salary = data["company"]["employee"]["payable"]["salary"]
print("Salary:", salary)

data["company"]["employee"]["birth_date"] = "1995-05-15"

output_file = Path(__file__).parent / "modified_employee.json"

with output_file.open("w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)

print("Modified JSON saved successfully.")
