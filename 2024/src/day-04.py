import util
import itertools

DIRS = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
XMAS_DIAG = set(['M', 'S'])

def count_mas_from(row: int, col: int, input: list[str]) -> int:
    height = len(input)
    width = len(input[0])
    count = 0
    for dir in DIRS:
        probe_row = row
        probe_col = col
        matched = True
        for char in 'MAS':
            probe_row += dir[0]
            probe_col += dir[1]
            if not (
                0 <= probe_row < height
                and 0 <= probe_col < width
                and input[probe_row][probe_col] == char
            ):
                matched = False
                break
        if matched:
            count += 1
    return count

def part1(input: list[str]):
    # Look for all 'X' and search in all directions for a full 'XMAS
    count = 0
    for row in range(len(input)):
        for col in range(len(input)):
            if input[row][col] == 'X':
                count += count_mas_from(row, col, input)
    return count

def is_xmas_at(row: int, col: int, input: list[str]) -> bool:
    height = len(input)
    width = len(input[0])
    if not (1 <= row < height - 1 and 1 <= col < width -1):
        return False
    diag1 = set([input[row - 1][col - 1], input[row + 1][col + 1]]) # top left & bottom right
    diag2 = set([input[row + 1][col - 1], input[row - 1][col + 1]]) # bottom left & top right
    return diag1 == XMAS_DIAG and diag2 == XMAS_DIAG

def part2(input: list[str]):
    # Look for all 'A' and check if its the center of an X-MAS
    count = 0
    for row in range(len(input)):
        for col in range(len(input)):
            if input[row][col] == 'A':
                if is_xmas_at(row, col, input):
                    count += 1
    return count
    
if __name__ == "__main__":
    input = util.read_lines('day-04.txt')
    ans1 = part1(input)
    print(f"Answer for part 1: {ans1}")
    ans2 = part2(input)
    print(f"Answer for part 2: {ans2}")
