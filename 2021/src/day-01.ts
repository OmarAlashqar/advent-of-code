import readFile from './common/readFile';

const solutionPart1 = (depths: number[]) => {
  let result = 0;
  for (let i = 0; i < depths.length - 1; i++) {
    const first = depths[i];
    const second = depths[i + 1];
    if (second > first) result += 1;
  }

  return result;
};

const solutionPart2 = (depths: number[]) => {
  const windowedSums = [];
  for (let i = 0; i < depths.length - 2; i++) {
    windowedSums.push(depths[i] + depths[i + 1] + depths[i + 2]);
  }

  return solutionPart1(windowedSums);
};

if (require.main === module) {
  const input = readFile('day-01.txt').split('\n').map(v => Number(v));
  // answer: 1139
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 1103
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
