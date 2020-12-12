// answer: 198428693313536
import readFile from '../common/readFile';

// I'm going to make the assumption that all adapters are unique,
// meaning there are no duplicate values in the input.

// I'm proud of this algorithm, as it took me quite a bit of thinking.
// After sorting, it runs in linear time and works by keeping an auxillary list that
// tracks the # of ways each adapter can be reached.

// This is an iterative implementation, but an identical one could be done
// using recursion since it works based on a recurrence relation.

export const solution = (input: number[]): number => {
  // insert two adapters: 0 and max(input)+3
  const adapters = [0, ...input.sort((a, b) => a - b), input[input.length - 1] + 3];

  // seed the initial value to kick off the algorithm
  const waysToReach = new Array(adapters.length).fill(0);
  waysToReach[0] = 1;

  for (let i = 0; i < adapters.length - 1; i++) {
    // check the next 3 numbers
    for (let j = 1; j <= 3; j++) {
      if (i + j >= adapters.length) break;
      else if (adapters[i + j] - adapters[i] <= 3) {
        waysToReach[i + j] += waysToReach[i];
      }
    }
  }

  return waysToReach[waysToReach.length - 1];
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  const input = raw.map(v => Number(v));
  console.log(solution(input));
}
