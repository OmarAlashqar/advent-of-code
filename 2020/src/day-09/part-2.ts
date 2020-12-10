// answer: 23761694
import {exit} from 'process';
import readFile from '../common/readFile';

// adapted from day-01/part-1.ts
const twoSum = (input: number[], total: number): boolean => {
  // key is a number, and the value is the index at which a complementary number can be found
  const complements: {[key: number]: number} = {};

  for (let i = 0; i < input.length; i++) {
    const n = input[i];

    if (complements[n] === undefined) complements[total - n] = i;
    else return true;
  }

  // in case none could be found
  return false;
};

// this is the solution from part-1
const findVulnerability = (input: number[], window: number): number => {
  // skip the preamble, which has the same size as the window
  for (let i = window; i < input.length; i++) {
    const slice = input.slice(i - window, i);
    if (!twoSum(slice, input[i])) return input[i];
  }

  throw new Error('No solution found');
};

const sumAll = (list: number[]): number => list.reduce((acc, n) => acc + n, 0);

export const solution = (input: number[], window: number): number => {
  const total = findVulnerability(input, window);

  // try all possible sub-arrays, I don't think we can do anything fancy here.
  // fast-fail if sum is larger than expected
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const slice = input.slice(i, j + 1);
      const sum = sumAll(slice);

      if (sum > total) break;
      else if (sum === total) {
        slice.sort((a, b) => a - b);
        return slice[0] + slice[slice.length - 1];
      }
    }
  }

  throw new Error('No solution found');
};

(async () => {
  const raw = (await readFile(__dirname)).split('\n');
  const input = raw.map(v => Number(v));
  console.log(solution(input, 25));
})().catch(console.error);
