// answer: 1294
import readFile from '../common/readFile';

// I'm assuming left and right rotations are by multiples of 90 degrees

const DIRS: {[dir: string]: number[]} = {
  N: [0, 1],
  S: [0, -1],
  E: [1, 0],
  W: [-1, 0],
};

const ORDERED_DIRS = [DIRS.N, DIRS.E, DIRS.S, DIRS.W];

const INITIAL_STATE = {
  dir: DIRS.E,
  dirIdx: 1,
  pos: [0, 0],
};

export const solution = (input: string[]): number => {
  const state = input.reduce((state, command) => {
    let instruction = command[0];
    let arg = Number(command.substr(1)) % 360;

    // only deal with right rotation for simplicity
    if (instruction === 'L') {
      instruction = 'R';
      arg = 360 - arg;
    }

    if (instruction in DIRS) {
      state.pos[0] += DIRS[instruction][0] * arg;
      state.pos[1] += DIRS[instruction][1] * arg;
    } else if (instruction === 'F') {
      state.pos[0] += state.dir[0] * arg;
      state.pos[1] += state.dir[1] * arg;
    } else if (instruction === 'R') {
      if (arg === 360) return state;
      state.dirIdx = (state.dirIdx + arg / 90) % 4;
      state.dir = ORDERED_DIRS[state.dirIdx];
    } else {
      throw new Error(`Encountered unknown command: ${command}`);
    }

    return state;
  }, INITIAL_STATE);

  // manhattan distance
  return Math.abs(state.pos[0]) + Math.abs(state.pos[1]);
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw));
}
