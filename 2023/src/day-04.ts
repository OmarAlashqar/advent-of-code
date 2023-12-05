import readFile from './common/readFile';

const getMatches = line => {
  const [winners, compare] = line.split(": ")[1].split("|").map(l => l.trim().split(/\s+/));
  const set = new Set(compare);
  return winners.reduce((n, v) => n + Number(set.has(v)), 0);
}

const solutionPart1 = (input: string[]) => {
  return input.reduce((sum, line) => {
    const matches = getMatches(line);
    return sum + (matches ? Math.pow(2, matches - 1) : 0);
  }, 0);
};

const solutionPart2 = (input: string[]) => {
  const copies = Array(input.length).fill(1);
  return input.reduce((sum, line, idx) => {
    const matches = getMatches(line);
    for (let i = 1; i <= matches && idx + i < copies.length; i++) copies[idx + i] += copies[idx];
    return sum + copies[idx];
  }, 0);
};

if (require.main === module) {
  const input = readFile('day-04.txt').split('\n');
  // const input = readFile('day-04.debug.txt').split('\n');
  // answer: 24542
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 8736438
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
