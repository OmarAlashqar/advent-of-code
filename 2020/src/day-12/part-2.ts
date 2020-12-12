// answer: 20592
import readFile from '../common/readFile';

// Extremely similar to part-1 but with some nice vector transformations
// I'm assuming left and right rotations are by multiples of 90 degrees

const DIRS: {[dir: string]: number[]} = {
  N: [0, 1],
  S: [0, -1],
  E: [1, 0],
  W: [-1, 0],
};

const INITIAL_STATE = {
  waypointPos: [10, 1], // relative to ship
  pos: [0, 0],
};

// rotates 2d vector clockwise a specified number of times
const rotatePos = (pos: number[], times: number): number[] => {
  let newPos = [...pos]; // clone input
  for (let i = 0; i < times; i++) newPos = [newPos[1], -newPos[0]];
  return newPos;
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
      state.waypointPos[0] += DIRS[instruction][0] * arg;
      state.waypointPos[1] += DIRS[instruction][1] * arg;
    } else if (instruction === 'F') {
      state.pos[0] += state.waypointPos[0] * arg;
      state.pos[1] += state.waypointPos[1] * arg;
    } else if (instruction === 'R') {
      if (arg === 360) return state;
      state.waypointPos = rotatePos(state.waypointPos, arg / 90);
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
