import util
import re

def sum_of_matches(line: str) -> int:
    sum = 0
    matches = re.findall('mul\((\d{1,3},\d{1,3})\)', line)
    for match in matches:
        a, b = match.split(',')
        sum += int(a) * int(b)
    return sum

def part1(input: list[str]):
    sum = 0
    for line in input:
        sum += sum_of_matches(line)
    return sum


def part2(input: list[str]):
    sum = 0
    line = ''.join(input)
    sections = line.split("don't()")
    for idx in range(len(sections)):
        if idx == 0:
            # The first entry didn't start with a "don't"
            sum += sum_of_matches(sections[idx])
        else:
            # Split by the first "do()", accepting everything after it
            parts = sections[idx].split('do()', 1)
            if len(parts) == 2:
                sum += sum_of_matches(parts[1])
    return sum
                
    
if __name__ == "__main__":
    input = util.read_lines('day-03.txt')
    ans1 = part1(input)
    print(f"Answer for part 1: {ans1}")
    ans2 = part2(input)
    print(f"Answer for part 2: {ans2}")
