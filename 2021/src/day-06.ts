import readFile from './common/readFile';

// Brute force simulation runs out of heap space on big durations.
// I spent some time trying to come up with a mathematical formula
// to figure out the number of future ancestors per fish, but came
// to nothing. :(

const solution = (fish: number[], nDays: number) => {
  const fishByTimer = new Array(9).fill(0);
  fish.forEach(t => { fishByTimer[t] += 1; });

  for (let day = 0; day < nDays; day++) {
    const births = fishByTimer.shift();
    fishByTimer.push(births);
    fishByTimer[6] += births;
  }

  return fishByTimer.reduce((agg, n) => agg + n, 0);
};

if (require.main === module) {
  const input = readFile('day-06.txt').split(',').map(v => Number(v));
  // answer: 375482
  console.log(`Result for Part 1: ${solution(input, 80)}`);
  // answer: 1689540415957
  console.log(`Result for Part 2: ${solution(input, 256)}`);
}
