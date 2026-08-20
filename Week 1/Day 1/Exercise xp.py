# Exercise 1
print("Hello world\n" * 4)

# Exersice 2
print((99 ** 3) * 8)

# Exercise 3
print(5 < 3)  # False
print(3 == 3)  # True
print(3 == "3")  # False
print("3" > str(3))  # Type error
print("Hello" == "hello")  # False

# Exercise 4
computer_brand = "Lenovo"
print(f"I have a {computer_brand} computer.")

# Exercise 5
name = "Lizz"
age = "19"
shoe_size = "45"
info = f"My name is {name}; I am {age} years old and my shoe size is {shoe_size}. I help people write code."
print(info)

# Exercise 6
a = 10
b = 5

if a > b:
	print("Hello World")

# Exercise 7
number = int(input("Enter a number: "))

if number % 2 == 0:
	print("The number is even.")
else:
	print("The number is odd")

# Exercise 8
user_name = input("What is your name? ").strip()

if user_name.lower() == name.lower():
	print("No way, we have the same name! The name committee has excellent taste.")
else:
	print(f"Nice to meet you, {user_name}! I guess there is only one {name} in this conversation.")

# Exercise 9
height = float(input("Enter your height in centimeters: "))

if height > 145:
	print("You are tall enough to ride!")
else:
	print("You need to grow some more to ride.")
	
