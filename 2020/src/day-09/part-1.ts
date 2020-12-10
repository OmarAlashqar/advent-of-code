// answer: 138879426
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

export const solution = (input: number[], window: number): number => {
  // skip the preamble, which has the same size as the window
  for (let i = window; i < input.length; i++) {
    const slice = input.slice(i - window, i);
    if (!twoSum(slice, input[i])) return input[i];
  }

  throw new Error('No solution found');
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  const input = raw.map(v => Number(v));
  console.log(solution(input, 25));
}
