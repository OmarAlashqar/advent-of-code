import util

def parse(input: list[str]):
    list1, list2 = [], []
    for line in input:
        num1, num2 = line.split()
        list1.append(int(num1))
        list2.append(int(num2))
    return list1, list2

def part1(input: list[str]):
    list1, list2 = parse(input)
    list1.sort()
    list2.sort()
    return sum([abs(list1[idx] - list2[idx]) for idx in range(len(list1))])

def part2(input: list[str]):
    list1, list2 = parse(input)

    frequency = dict()
    for num in list2:
        if num not in frequency:
            frequency[num] = 0
        frequency[num] += 1
    
    similarity = 0
    for num in list1:
        if num in frequency:
            similarity += num * frequency[num]
    
    return similarity
    
if __name__ == "__main__":
    input = util.read_lines('day-01.txt')
    ans1 = part1(input)
    print(f"Answer for part 1: {ans1}")
    ans2 = part2(input)
    print(f"Answer for part 2: {ans2}")
