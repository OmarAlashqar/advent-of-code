// answer: 1294
import readFile from '../common/readFile';

export const solution = (input: number[], position: number): number => {
  if (2020 <= input.length) return input[2020 - 1];
  if (input.length === 0) return NaN;

  const track: {[key: number]: number} = {};
  let prev = input[0];
  let prevWasNew = true;
  let prevDiff = 0;

  // reading inputs
  for (let i = 0; i < input.length; i++) {
    const n = input[i];

    // only need to set these before the last input
    if (i === input.length - 1) {
      prev = n;
      prevWasNew = !(n in track);
      if (!prevWasNew) prevDiff = i - track[prev];
    }

    track[n] = i;
  }

  // reading past inputs
  for (let i = input.length; i < position; i++) {
    prev = prevWasNew ? 0 : prevDiff;
    prevWasNew = !(prev in track);
    if (!prevWasNew) prevDiff = i - track[prev];
    track[prev] = i;
  }

  return prev;
};

if (require.main === module) {
  const raw = readFile(__dirname).split(',');
  const input = raw.map(v => Number(v));
  console.log(solution(input, 2020));
}
