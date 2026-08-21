# Challenge
MATRIX_STR = '''
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%'''

rows = MATRIX_STR.strip("\n").splitlines()
column_count = max(len(row) for row in rows)

matrix = [list(row.ljust(column_count)) for row in rows]

encoded_message = ""

for column in range(column_count):
    for row in matrix:
        encoded_message += row[column]

decoded_message = ""
symbol_found = False

for character in encoded_message:
    if character.isalpha():
        if symbol_found and decoded_message:
            decoded_message += " "
        decoded_message += character
        symbol_found = False
    else:
        symbol_found = True

print(decoded_message)
