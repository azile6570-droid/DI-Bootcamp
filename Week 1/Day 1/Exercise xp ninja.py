# Exercise 1

    # In the Windows terminal, run `python` to open the Python console.
# PATH contains folders searched by the terminal, so Python can be found
# without changing to the folder where python.exe is installed.

# Exercise 2
# On Windows, run `py` in the terminal to open the Python console.

# Exercise 3
# Predictions:
# 3 <= 3 < 9                         # True
# 3 == 3 == 3                        # True
# bool(0)                            # False
# bool(5 == "5")                     # False
# bool(4 == 4) == bool("4" == "4")   # True
# bool(bool(None))                   # False

x = (1 == True)
y = (1 == False)
a = True + 4
b = False + 10

print("x is", x)
print("y is", y)
print("a:", a)
print("b:", b)

# Exercise 4
my_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
print(len(my_text))

# Exercise 5
longest_sentence = ""

while True:
	sentence = input("Enter a sentence without the letter A (or type 'quit'): ")
	if sentence.lower() in ("quit", "exit"):
		break
	if "a" in sentence.lower():
		print("That sentence contains the letter A. Try again.")
	elif len(sentence) > len(longest_sentence):
		longest_sentence = sentence
		print(f"Congratulations! You set a new record: {len(sentence)} characters.")



