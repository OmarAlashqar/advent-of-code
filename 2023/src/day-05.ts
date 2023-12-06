import readFile from './common/readFile';

const next = (map: number[][], value: number) => {
  for (let range of map) {
    if (value >= range[1] && value <= range[1] + range[2] - 1) {
      return range[0] + (value - range[1]);
    }
  }
  return value;
};

const parse = (input: string[]): [number[], number[][][]] => {
  const [seedRaw, ...mapsRaw] = input;
  const seeds = seedRaw.match(/\d+/g)!.map(v => Number(v));
  const maps = mapsRaw.map(lines => {
    const [_, ...rangesRaw] = lines.split(/\n/);
    return rangesRaw.map(r => r.split(" ").map(v => Number(v)));
  });
  return [seeds, maps];
}

const solutionPart1 = (input: string[]) => {
  const [seeds, maps] = parse(input);

  const locations = seeds.map(seed => {
    let current = seed;
    for (let map of maps) current = next(map, current);
    return current;
  });

  return Math.min(...locations);
};

/*
Part 2 makes the input insanely large, so you have two options:
  1. Do something smart like combining the maps or something generally fancy
  2. Just do the same naive forward-search, which takes ages and makes the CPU work very hard

If you can't already tell, I took the second approach. I walked around and ate a snack instead
of going big brain mode. Worth it.
*/
const solutionPart2 = (input: string[]) => {
  const [seedRanges, maps] = parse(input);

  // generator instead of pre-computing all seeds
  const seeds = function* () {
    for (let i = 0; i < seedRanges.length; i += 2) {
      for (let d = 0; d < seedRanges[i + 1]; d++) {
        yield seedRanges[i] + d;
      }
    }
  }

  let min = Number.MAX_VALUE;
  for (let seed of seeds()) {
    let current = seed;
    for (let map of maps) current = next(map, current);
    min = Math.min(min, current);
  }

  return min;
};

if (require.main === module) {
  const input = readFile('day-05.txt').split('\n\n');
  // const input = readFile('day-05.debug.txt').split('\n\n');
  // answer: 331445006
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 6472060
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
