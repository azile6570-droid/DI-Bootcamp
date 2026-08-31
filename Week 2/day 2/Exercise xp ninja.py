# Exercise 1
class GameOfLife:
    def __init__(self, grid):
        self.grid = [row[:] for row in grid]
        self.rows = len(grid)
        self.cols = len(grid[0])

    def display(self, generation):
        print(f"\nGeneration {generation}")
        for row in self.grid:
            print(" ".join("■" if cell else "." for cell in row))

    def count_neighbors(self, row, col):
        count = 0

        for row_change in (-1, 0, 1):
            for col_change in (-1, 0, 1):
                if row_change == 0 and col_change == 0:
                    continue

                new_row = row + row_change
                new_col = col + col_change

                if (
                    0 <= new_row < self.rows
                    and 0 <= new_col < self.cols
                    and self.grid[new_row][new_col]
                ):
                    count += 1

        return count

    def next_generation(self):
        new_grid = []

        for row in range(self.rows):
            new_row = []

            for col in range(self.cols):
                neighbors = self.count_neighbors(row, col)
                alive = self.grid[row][col]

                if alive and neighbors in (2, 3):
                    new_row.append(True)
                elif not alive and neighbors == 3:
                    new_row.append(True)
                else:
                    new_row.append(False)

            new_grid.append(new_row)

        self.grid = new_grid

    def is_empty(self):
        return not any(any(row) for row in self.grid)

    def run(self, generations):
        previous_grid = None

        for generation in range(generations + 1):
            self.display(generation)

            current_grid = tuple(tuple(row) for row in self.grid)

            if self.is_empty():
                print("\nThe game ended: all cells are dead.")
                break

            if current_grid == previous_grid:
                print("\nThe game ended: the pattern is stable.")
                break

            previous_grid = current_grid

            if generation < generations:
                self.next_generation()


# Example 1: Blinker
blinker = [
    [False, False, False, False, False],
    [False, True, True, True, False],
    [False, False, False, False, False],
    [False, False, False, False, False],
    [False, False, False, False, False],
]

# Example 2: Block
block = [
    [False, False, False, False, False],
    [False, True, True, False, False],
    [False, True, True, False, False],
    [False, False, False, False, False],
    [False, False, False, False, False],
]

# Example 3: Glider
glider = [
    [False, True, False, False, False],
    [False, False, True, False, False],
    [True, True, True, False, False],
    [False, False, False, False, False],
    [False, False, False, False, False],
]

print("Blinker:")
GameOfLife(blinker).run(10)

print("\nBlock:")
GameOfLife(block).run(10)
print("\nGlider:")
GameOfLife(glider).run(10)
