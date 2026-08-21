# Exercise 1
student_grades = {
    "Alice": [88, 92, 100],
    "Bob": [75, 78, 80],
    "Charlie": [92, 90, 85],
    "Dana": [83, 88, 92],
    "Eli": [78, 80, 72]
}

student_averages = {}
student_letter_grades = {}

for student, grades in student_grades.items():
    average = sum(grades) / len(grades)
    student_averages[student] = average

    if average >= 90:
        letter_grade = "A"
    elif average >= 80:
        letter_grade = "B"
    elif average >= 70:
        letter_grade = "C"
    elif average >= 60:
        letter_grade = "D"
    else:
        letter_grade = "F"

    student_letter_grades[student] = letter_grade

class_average = sum(student_averages.values()) / len(student_averages)

for student in student_grades:
    print(
        f"{student}: Average = {student_averages[student]:.2f}, "
        f"Grade = {student_letter_grades[student]}"
    )

print(f"Class average: {class_average:.2f}")

# Exercise 2
sales_data = [
    {"customer_id": 1, "product": "Smartphone", "price": 600, "quantity": 1, "date": "2023-04-03"},
    {"customer_id": 2, "product": "Laptop", "price": 1200, "quantity": 1, "date": "2023-04-04"},
    {"customer_id": 1, "product": "Laptop", "price": 1000, "quantity": 1, "date": "2023-04-05"},
    {"customer_id": 2, "product": "Smartphone", "price": 500, "quantity": 2, "date": "2023-04-06"},
    {"customer_id": 3, "product": "Headphones", "price": 150, "quantity": 4, "date": "2023-04-07"},
    {"customer_id": 3, "product": "Smartphone", "price": 550, "quantity": 1, "date": "2023-04-08"},
    {"customer_id": 1, "product": "Headphones", "price": 100, "quantity": 2, "date": "2023-04-09"},
]

product_sales = {}
customer_spending = {}
purchase_counts = {}
product_totals = {}
product_transaction_counts = {}
product_quantities = {}

for transaction in sales_data:
    total_price = transaction["price"] * transaction["quantity"]
    product = transaction["product"]
    customer = transaction["customer_id"]

    transaction["total_price"] = total_price

    product_sales[product] = product_sales.get(product, 0) + total_price
    customer_spending[customer] = customer_spending.get(customer, 0) + total_price
    purchase_counts[customer] = purchase_counts.get(customer, 0) + 1

    product_totals[product] = product_totals.get(product, 0) + total_price
    product_transaction_counts[product] = product_transaction_counts.get(product, 0) + 1
    product_quantities[product] = product_quantities.get(product, 0) + transaction["quantity"]

high_value_transactions = [
    transaction for transaction in sales_data
    if transaction["total_price"] > 500
]
high_value_transactions.sort(
    key=lambda transaction: transaction["total_price"],
    reverse=True
)

loyal_customers = [
    customer for customer, count in purchase_counts.items()
    if count > 1
]

average_transaction_values = {
    product: product_totals[product] / product_transaction_counts[product]
    for product in product_totals
}

most_popular_product = max(product_quantities, key=product_quantities.get)

print("Sales by product:", product_sales)
print("Customer spending:", customer_spending)
print("High-value transactions:", high_value_transactions)
print("Loyal customers:", loyal_customers)
print("Average transaction values:", average_transaction_values)
print("Most popular product:", most_popular_product)
