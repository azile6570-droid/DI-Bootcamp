# Challenge
user_string = input("Enter a string of exactly 10 characters: ")

if len(user_string) < 10:
    print("String not long enough.")
elif len(user_string) > 10:
    print("String too long.")
else:
    print("Perfect string")
    print(user_string[0])
    print(user_string[-1])

    built_string = ""

    for character in user_string:
        built_string += character
        print(built_string)

