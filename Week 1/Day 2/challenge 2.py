from datetime import date, datetime


def print_cake(candle_count):
	candles = "i" * candle_count
	print(f"       ___{ candles }___")
	print("      |:H:a:p:p:y:|")
	print("    __|___________|__")
	print("   |^^^^^^^^^^^^^^^^^|")
	print("   |:B:i:r:t:h:d:a:y:|")
	print("   |                 |")
	print("   ~~~~~~~~~~~~~~~~~~~")


birthdate_text = input("Enter your birthdate (DD/MM/YYYY): ")
birthdate = datetime.strptime(birthdate_text, "%d/%m/%Y").date()
today = date.today()
age = today.year - birthdate.year
if (today.month, today.day) < (birthdate.month, birthdate.day):
	age -= 1

print_cake(age % 10)
if birthdate.year % 4 == 0 and (birthdate.year % 100 != 0 or birthdate.year % 400 == 0):
	print()
	print_cake(age % 10)


