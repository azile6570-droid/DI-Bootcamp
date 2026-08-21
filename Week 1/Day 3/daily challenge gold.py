# Challenge
choice = input("Do you want to encrypt or decrypt? ").lower()
message = input("Enter your message: ")
shift = int(input("Enter the shift: "))

if choice == "decrypt":
    shift = -shift

result = ""

for character in message:
    if character.isalpha():
        start = ord("A") if character.isupper() else ord("a")
        result += chr((ord(character) - start + shift) % 26 + start)
    else:
        result += character

print(result)