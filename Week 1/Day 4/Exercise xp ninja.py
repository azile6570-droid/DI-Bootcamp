# Exercise 1
def get_full_name(first_name, last_name, middle_name=""):
    name_parts = [first_name, middle_name, last_name]
    return " ".join(part.capitalize() for part in name_parts if part)


print(get_full_name("john", "lee", "hooker"))
print(get_full_name("bruce", "lee"))

# Exercise 2
MORSE_CODE = {
    "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".",
    "f": "..-.", "g": "--.", "h": "....", "i": "..", "j": ".---",
    "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---",
    "p": ".--.", "q": "--.-", "r": ".-.", "s": "...", "t": "-",
    "u": "..-", "v": "...-", "w": ".--", "x": "-..-", "y": "-.--",
    "z": "--.."
}

MORSE_TO_ENGLISH = {code: letter for letter, code in MORSE_CODE.items()}


def english_to_morse(text):
    return " / ".join(
        " ".join(MORSE_CODE[letter] for letter in word.lower())
        for word in text.split()
    )


def morse_to_english(code):
    return " ".join(
        "".join(MORSE_TO_ENGLISH[symbol] for symbol in word.split())
        for word in code.split(" / ")
    )


print(english_to_morse("Hello World"))
print(morse_to_english(".... . .-.. .-.. --- / .-- --- .-. .-.. -.."))

# Exercise 3
def box_printer(*strings):
    width = max(len(string) for string in strings)

    print("*" * (width + 4))
    for string in strings:
        print(f"* {string.ljust(width)} *")
    print("*" * (width + 4))


box_printer("Hello", "World", "in", "reallylongword", "a", "frame")

# Exercise 4
def insertion_sort(alist):
    for index in range(1, len(alist)):
        currentvalue = alist[index]
        position = index

        while position > 0 and alist[position - 1] > currentvalue:
            alist[position] = alist[position - 1]
            position -= 1

        alist[position] = currentvalue


alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
insertion_sort(alist)
print(alist)


