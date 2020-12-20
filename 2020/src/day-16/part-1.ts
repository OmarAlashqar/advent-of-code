// answer: 20058
import readFile from '../common/readFile';

// this looks fun. i'll do this part brute-force, but i'll
// implement interval trees for efficient matching in part 2.

interface Input {
  rules: {[field: string]: {from: number; to: number}[]};
  ticket: number[];
  otherTickets: number[][];
}

export const solution = (input: Input): number => {
  const ranges = Object.values(input.rules).flat();

  const validValue = (v: number): boolean => {
    for (let r of ranges) {
      if (r.from <= v && v <= r.to) return true;
    }

    return false;
  };

  let errRate = 0;
  for (let ticket of input.otherTickets) {
    for (let v of ticket) {
      if (!validValue(v)) errRate += v;
    }
  }

  return errRate;
};

const parseInput = (input: string): Input => {
  const result: Input = {rules: {}, ticket: [], otherTickets: []};

  const [rulesRaw, ticketRaw, otherTicketsRaw] = input.split('\n\n');

  // parsing field rules
  const rulesStrList = rulesRaw.split('\n');
  for (let r of rulesStrList) {
    const match = r.match(/(.+): (\d+)-(\d+) or (\d+)-(\d+)/);
    if (!match) throw new Error(`Encountered faulty rule: ${r}`);

    result.rules[match[1]] = [
      {from: Number(match[2]), to: Number(match[3])},
      {from: Number(match[4]), to: Number(match[5])},
    ];
  }

  // parsing ticket
  const [_1, ticketStr] = ticketRaw.split('\n');
  result.ticket = ticketStr.split(',').map(v => Number(v));

  // parsing other ticket
  const [_2, ...otherTicketsStrList] = otherTicketsRaw.split('\n');
  for (let t of otherTicketsStrList) {
    result.otherTickets.push(t.split(',').map(v => Number(v)));
  }

  return result;
};

if (require.main === module) {
  const raw = readFile(__dirname);
  const input = parseInput(raw);
  console.log(solution(input));
}
