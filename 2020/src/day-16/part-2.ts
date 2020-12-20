// answer: 366871907221
import {exit} from 'process';
import readFile from '../common/readFile';

// an interval tree would replace the check for
// which intervals match a given data point.

// however, we consider smaller sets of intervals
// iteratively in order to decide which field matches
// each column. this means that the interval tree would
// need to be modified each time, reducing its performance
// benefit over a simple iteration.

// i'll be leaving interval trees for another time, where
// they can be applied in a useful manner.

interface Input {
  rules: {[field: string]: {from: number; to: number}[]};
  ticket: number[];
  otherTickets: number[][];
}

const getTicketValidator = (ranges: {from: number; to: number}[]) => {
  return (ticket: number[]): boolean => {
    // checks all values in ticket and makes sure they match
    // at least one range.

    const validValue = (v: number): boolean => {
      for (let r of ranges) if (r.from <= v && v <= r.to) return true;
      return false;
    };

    for (let v of ticket) if (!validValue(v)) return false;
    return true;
  };
};

export const solution = (input: Input): number => {
  // 1. filter out invalid tickets

  const allRanges = Object.values(input.rules).flat();
  const validateTicket = getTicketValidator(allRanges);
  const validTickets = input.otherTickets.filter(t => validateTicket(t));

  // 2. match columns with fields

  const columns = new Array<string>(Object.keys(input.rules).length);
  const leftoverRules = {...input.rules};

  // we'll have to keep repeating the process until all columns
  // have been matched. this is necessary since ranges overlap.
  while (Object.keys(leftoverRules).length > 0) {
    // attempts to match columns by process of elimination
    for (let col = 0; col < columns.length; col++) {
      // skip the column if it's already been matched
      if (columns[col] !== undefined) continue;

      const rules = {...leftoverRules};

      // run process of elimination by checking against
      // all values in this column.
      for (let ticket of validTickets) {
        const v = ticket[col];
        for (let field in rules) {
          const ranges = leftoverRules[field];
          const validateTicket = getTicketValidator(ranges);

          if (!validateTicket([v])) {
            // rule doesn't match column data, eliminate it
            delete rules[field];
          }
        }

        // once at most one rule is left, we may have a candidate
        if (Object.keys(rules).length <= 1) break;
      }

      const fields = Object.keys(rules);

      // if multiple rules matched, then we don't know for sure
      if (fields.length !== 1) continue;

      // we have a match!
      columns[col] = fields[0];
      delete leftoverRules[fields[0]];
    }
  }

  // 3. calculate answer
  let result = 1;
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].includes('departure')) result *= input.ticket[i];
  }

  return result;
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
