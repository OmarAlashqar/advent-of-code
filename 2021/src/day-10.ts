import readFile from './common/readFile';

const scoreMap1 = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
const scoreMap2 = { ')': 1, ']': 2, '}': 3, '>': 4 };
const openers = new Set(['(', '[', '{', '<']);
const matchMap = { '(': ')', '[': ']', '{': '}', '<': '>' };

const findErrorScore = (line: string): number => {
  const stack: string[] = [];

  for (let char of line) {
    if (openers.has(char)) stack.push(char);
    else if (matchMap[stack[stack.length - 1]] === char) stack.pop();
    else return scoreMap1[char];
  }

  return 0;
};

const solutionPart1 = (input: string[]) => {
  return input.reduce((sum, line) => sum + findErrorScore(line), 0);
};

const solutionPart2 = (input: string[]) => {
  const incompleteLines =  input.filter(line => findErrorScore(line) == 0);

  const stacks: string[][] = [];
  for (let line of incompleteLines) {
    const stack: string[] = [];
    for (let char of line) {
      if (openers.has(char)) stack.push(char);
      else if (matchMap[stack[stack.length - 1]] === char) stack.pop();
    }
    stacks.push(stack);
  }

  const scores = stacks.map(stack => {
    return stack.reduceRight((agg, char) => agg * 5 + scoreMap2[matchMap[char]], 0);
  });

  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
};

if (require.main === module) {
  const input = readFile('day-10.txt').split('\n');
  // answer: 166191
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 1152088313
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
