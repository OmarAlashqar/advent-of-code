// answer: 1303
import readFile from '../common/readFile';

// Immutable state was useful since I'm able to simulate a branch of the program
// easily since state is isolated and cloned

interface State {
  pc: number;
  accum: number;
  visited: boolean[];
}

interface Reducers {
  [key: string]: (state: State, arg: number) => State;
}

// these take in current state, an action, and args
// then return a new state without mutating references from old state
const reducers: Reducers = {
  acc: (state, arg) => ({visited: [...state.visited], accum: state.accum + arg, pc: state.pc + 1}),
  jmp: (state, arg) => ({...state, visited: [...state.visited], pc: state.pc + arg}),
  nop: state => ({...state, visited: [...state.visited], pc: state.pc + 1}),
};

export const solution = (program: string[]): number => {
  let state: State = {
    pc: 0,
    accum: 0,
    visited: new Array(program.length).fill(false),
  };

  const result = subSolution(program, state, false);
  if (!result) throw new Error('No solution found');

  return result;
};

// this is a recursive function, but only ever has a depth of 2
// since only one command from the program must be swapped
const subSolution = (program: string[], state: State, ignore = false): number | null => {
  while (state.pc < program.length) {
    if (state.visited[state.pc]) return null;

    state.visited[state.pc] = true;
    let [command, arg] = program[state.pc].split(' ');

    // simulate a command swap and execute the rest of the program normally
    if (!ignore && (command === 'jmp' || command === 'nop')) {
      const alternateCommand = command === 'jmp' ? 'nop' : 'jmp';
      const alternateState = reducers[alternateCommand](state, Number(arg));

      const result = subSolution(program, alternateState, true);
      if (result) return result;
    }

    if (command in reducers) state = reducers[command](state, Number(arg));
    else throw new Error(`Encountered unknown command on line ${state.pc + 1}: ${command}`);
  }

  return state.accum;
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw));
}
