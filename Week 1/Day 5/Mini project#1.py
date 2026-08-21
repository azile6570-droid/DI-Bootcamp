# Tic Tac Toe
def display_board(board):
    print("\n-------------")
    for row in board:
        print(f"| {row[0]} | {row[1]} | {row[2]} |")
        print("-------------")


def player_input(player, board):
    while True:
        try:
            row = int(input(f"Player {player}, enter the row (1-3): ")) - 1
            column = int(input(f"Player {player}, enter the column (1-3): ")) - 1

            if not 0 <= row <= 2 or not 0 <= column <= 2:
                print("Please enter numbers from 1 to 3.")
            elif board[row][column] != " ":
                print("That position is already taken.")
            else:
                board[row][column] = player
                break
        except ValueError:
            print("Please enter valid numbers.")


def check_win(board, player):
    winning_combinations = [
        # Rows
        [(0, 0), (0, 1), (0, 2)],
        [(1, 0), (1, 1), (1, 2)],
        [(2, 0), (2, 1), (2, 2)],
        # Columns
        [(0, 0), (1, 0), (2, 0)],
        [(0, 1), (1, 1), (2, 1)],
        [(0, 2), (1, 2), (2, 2)],
        # Diagonals
        [(0, 0), (1, 1), (2, 2)],
        [(0, 2), (1, 1), (2, 0)],
    ]

    return any(
        all(board[row][column] == player for row, column in combination)
        for combination in winning_combinations
    )


def check_tie(board):
    return all(cell != " " for row in board for cell in row)


def play():
    board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ]

    current_player = "X"

    while True:
        display_board(board)
        player_input(current_player, board)

        if check_win(board, current_player):
            display_board(board)
            print(f"Player {current_player} wins!")
            break

        if check_tie(board):
            display_board(board)
            print("It's a tie!")
            break

        current_player = "O" if current_player == "X" else "X"


play()
