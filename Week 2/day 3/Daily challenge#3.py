# Challenge
people = []

for _ in range(5):
    name = input("Enter name: ")
    age = input("Enter age: ")
    score = input("Enter score: ")

    people.append((name, age, score))

people.sort(key=lambda person: (person[0], int(person[1]), int(person[2])))

print(people)
