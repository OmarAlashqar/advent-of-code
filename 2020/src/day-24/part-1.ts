// answer: 436
import readFile from '../common/readFile';

// good ole' state machine should be fine for this one.
// for tracking tiles, sparse array using a map should be good enough.

enum Dir {
  E = 'e',
  W = 'w',
  NE = 'ne',
  NW = 'nw',
  SE = 'se',
  SW = 'sw',
}

// [x, y] deltas, biased to one side.
// to visualize this layout: shift every row of hexagons to the left so the columns line up
const DIR_DELTA: {[dir: string]: number[]} = {
  [Dir.E]: [1, 0],
  [Dir.W]: [-1, 0],
  [Dir.NE]: [1, 1],
  [Dir.NW]: [0, 1],
  [Dir.SE]: [0, -1],
  [Dir.SW]: [-1, -1],
};

export const solution = (input: string[]): number => {
  const flippedTiles: Map<string, boolean> = new Map();

  for (let line of input) {
    let pos = [0, 0];
    let i = 0;
    // parse one or two chars at a time
    while (i < line.length) {
      // select one or two chars
      let ch = line[i++];
      if (ch !== Dir.E && ch !== Dir.W) ch += line[i++];

      // interpret direction
      const dir = DIR_DELTA[ch];
      pos = [pos[0] + dir[0], pos[1] + dir[1]];
    }

    // flip/unflip tile
    const id = pos.join(',');
    if (flippedTiles.has(id)) flippedTiles.delete(id);
    else flippedTiles.set(id, true);
  }

  return flippedTiles.size;
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw));
}
