import readFile from './common/readFile';

const solutionPart1 = (lines: string[]) => {
  return lines.reduce((sum: number, line: string) => {
    const digits = line.match(/(\d)/g)!;
    const value = Number(digits[0] + digits[digits.length - 1]);
    return sum + value;
  }, 0);
}

const solutionPart2 = (lines: string[]) => {
  const numbers = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const regex = RegExp(`(?=(\\d|${Object.keys(numbers).join("|")}))`, 'g');
  const resolveDigit = digit => digit in numbers ? numbers[digit] : digit;

  return lines.reduce((sum: number, line: string) => {
    const digits = [...line.matchAll(regex)].map(l => l[1]);
    const digit1 = resolveDigit(digits[0]);
    const digit2 = resolveDigit(digits[digits.length - 1]);
    const value = Number(digit1 + digit2);
    return sum + value;
  }, 0);
};

if (require.main === module) {
  const input = readFile('day-01.txt').split('\n');
  // answer: 54390
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 54277
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
