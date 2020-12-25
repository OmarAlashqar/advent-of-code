// answer: 4133
import readFile from '../common/readFile';

// using part-1 solution to obtain initial state
// then it's just another unbounded cell automata exercise.
// not using Classes this time

type FlippedTiles = Map<string, boolean>;

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

const DELTAS = Object.values(DIR_DELTA);

// recursive function up to one level
const tickPosition = (
  state: FlippedTiles,
  newState: FlippedTiles,
  visited: FlippedTiles,
  pos: number[],
  dig = true
): FlippedTiles => {
  let adjacent = 0;

  // count adjacent flipped tiles
  for (let delta of DELTAS) {
    const otherPos = [pos[0] + delta[0], pos[1] + delta[1]];
    const id = getId(otherPos);

    if (state.has(id)) adjacent++;
    else if (dig && !visited.has(id)) {
      // this position is an unflipped tile with at least one
      // flipped tile adjacent to it, we should check it out

      visited.set(id, true);
      tickPosition(state, newState, visited, otherPos, false);
    }
  }

  const id = getId(pos);
  if (!state.has(id) && adjacent === 2) newState.set(id, true);
  else if (state.has(id) && !(adjacent === 0 || adjacent > 2)) newState.set(id, true);

  return newState;
};

export const solution = (input: string[], cycles: number): number => {
  let state = parseInput(input);

  for (let day = 0; day < cycles; day++) {
    let newState: FlippedTiles = new Map();
    const visited: FlippedTiles = new Map();

    // iterate over flipped tiles
    for (let id of state.keys()) {
      let pos = fromId(id);
      // mutates newState and visited
      tickPosition(state, newState, visited, pos);
    }

    state = newState;
  }

  return state.size;
};

const getId = (pos: number[]): string => pos.join(',');
const fromId = (id: string): number[] => id.split(',').map(v => Number(v));

const parseInput = (input: string[]): FlippedTiles => {
  const state: FlippedTiles = new Map();

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
    const id = getId(pos);
    if (state.has(id)) state.delete(id);
    else state.set(id, true);
  }

  return state;
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw, 100));
}
