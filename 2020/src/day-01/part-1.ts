// answer: 866436

import readFile from '../common/readFile';

export const solution = (input: number[], total: number): number => {
  // key is a number, and the value is the index at which a complementary number can be found
  const complements: {[key: number]: number} = {};

  for (let i = 0; i < input.length; i++) {
    const n = input[i];

    if (complements[n] === undefined) complements[total - n] = i;
    else return n * input[complements[n]];
  }

  // in case none could be found
  return 0;
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  const input = raw.map(v => Number(v));
  console.log(solution(input, 2020));
}
