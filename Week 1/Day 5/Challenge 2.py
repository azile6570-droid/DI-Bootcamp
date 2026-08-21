# Exercise 1
# Pattern 1 
for row in range(1, 4):
    spaces = " " * (3 - row)
    stars = "*" * (2 * row - 1)
    print(spaces + stars)

print()

# Pattern 2
for row in range(1, 6):
    spaces = " " * (5 - row)
    print(spaces + "*" * row)

print()

# Pattern 3
for row in range(1, 6):
    print("*" * row)

for row in range(5, 0, -1):
    spaces = " " * (5 - row)
    print(spaces + "*" * row)

# Exercise 2

my_list = [2, 24, 12, 354, 233]

for i in range(len(my_list) - 1):
    minimum = i 

    for j in range(i + 1, len(my_list)):
        if my_list[j] < my_list[minimum]:
            minimum = j 

            if minimum != i:
                my_list[i], my_list[minimum] = my_list[minimum], my_list[i]

print(my_list) 

