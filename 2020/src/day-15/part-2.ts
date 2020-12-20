// answer: 573522
import readFile from '../common/readFile';

// okay so I learned something extremely valuable today.

// my solution for part-1 would take forever to run to check up to position 30000000.
// as a matter of fact, I haven't seen it terminate so I don't know how bad it would've been.

// to methodically optimize, i timed each potion of my code to identify to worst offender.
// to my surprise, it was the set/get of the tracking hashmap that took the longest by far.

// turns out JS objects are not a good idea to use as hashmaps since they always cast their keys
// to strings. however, the Map class implements hashing differently and doesn't cast keys to strings.

// since it can use the given numbers as keys directly, this significantly improved performance and
// was able to run the program in less than 10 seconds!

export const solution = (input: number[], position: number): number => {
  if (2020 <= input.length) return input[2020 - 1];
  if (input.length === 0) return NaN;

  const track = new Map<number, number>();
  let prev = input[0];
  let prevWasNew = true;
  let prevDiff = 0;

  // reading inputs
  for (let i = 0; i < input.length; i++) {
    const n = input[i];

    // only need to set these before the last input
    if (i === input.length - 1) {
      prev = n;
      prevWasNew = !track.has(n);
      if (!prevWasNew) prevDiff = i - (track.get(prev) as number);
    }

    track.set(n, i);
  }

  // reading past inputs
  for (let i = input.length; i < position; i++) {
    prev = prevWasNew ? 0 : prevDiff;
    prevWasNew = !track.has(prev);
    if (!prevWasNew) prevDiff = i - (track.get(prev) as number);
    track.set(prev, i);
  }

  return prev;
};

if (require.main === module) {
  const raw = readFile(__dirname).split(',');
  const input = raw.map(v => Number(v));
  console.log(solution(input, 30000000));
}
