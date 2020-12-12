// answer: 2592
import readFile from '../common/readFile';

export const solution = (input: number[]): number => {
  // insert two adapters: 0 and max(input)+3
  const adapters = [0, ...input.sort((a, b) => a - b), input[input.length - 1] + 3];

  const joltDiffs: {[diff: number]: number} = {};
  for (let i = 1; i < adapters.length; i++) {
    const diff = adapters[i] - adapters[i - 1];
    if (!(diff in joltDiffs)) joltDiffs[diff] = 0;
    joltDiffs[diff]++;
  }

  return joltDiffs[1] * joltDiffs[3];
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  const input = raw.map(v => Number(v));
  console.log(solution(input));
}
