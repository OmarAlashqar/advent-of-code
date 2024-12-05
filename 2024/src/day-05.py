import util
from collections import defaultdict
import math
from functools import cmp_to_key

def is_update_valid(pages: list[str], cant_come_before: dict[str, list[str]]):
    banned = set()
    for page in pages:
        if page in banned:
            return False
        else:
            banned.update(cant_come_before[page])
    return True

def part1(rules: list[str], updates: list[str]):
    cant_come_before = defaultdict(list)
    for rule in rules:
        pre, post = rule.split('|')
        cant_come_before[post].append(pre)

    sum = 0
    for update in updates:
        pages = update.split(',')
        if is_update_valid(pages, cant_come_before):
            sum += int(pages[math.floor(len(pages) / 2)])

    return sum

def part2(rules: list[str], updates: list[str]):
    cant_come_before = defaultdict(list)
    for rule in rules:
        pre, post = rule.split('|')
        cant_come_before[post].append(pre)

    def compare(a: str, b: str):
        if a in cant_come_before[b]:
            return 1
        elif b in cant_come_before[a]:
            return -1
        else:
            return 0

    sum = 0
    for update in updates:
        pages = update.split(',')
        if is_update_valid(pages, cant_come_before):
            continue
        fixed_pages = sorted(pages, key=cmp_to_key(compare))
        sum += int(fixed_pages[math.floor(len(fixed_pages) / 2)])
    
    return sum
    
if __name__ == "__main__":
    input = util.read_lines_with_split('day-05.txt')
    ans1 = part1(*input)
    print(f"Answer for part 1: {ans1}")
    ans2 = part2(*input)
    print(f"Answer for part 2: {ans2}")
