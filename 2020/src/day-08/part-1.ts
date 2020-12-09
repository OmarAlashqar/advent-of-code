// answer: 1867
import readFile from '../common/readFile';

// I went for an action reducer solution with immutable state, should be fun :D

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

  while (state.pc < program.length) {
    if (state.visited[state.pc]) return state.accum;

    state.visited[state.pc] = true;
    let [command, arg] = program[state.pc].split(' ');

    if (command in reducers) state = reducers[command](state, Number(arg));
    else throw new Error(`Encountered unknown command on line ${state.pc + 1}: ${command}`);
  }

  return 0;
};

(async () => {
  const raw = (await readFile(__dirname)).split('\n');
  console.log(solution(raw));
})().catch(console.error);
