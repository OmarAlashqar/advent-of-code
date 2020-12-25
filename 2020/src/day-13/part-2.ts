// answer: 535296695251210
import readFile from '../common/readFile';

// this one was way too cool :')

// the idea is to iterate by multiples of the BusIDs,
// updating the increment by multiplying it by the new BusID
// that gets matched.

// the process looks like this:
// 0- N = 2 and increment = 1st bus id
// 1- find a timestamp that works for N buses by incrementing by increment value
// 2- change increment to be product of those bus ids
// 3- N = N + 1 and repeat step 1 unless all buses matched

interface Bus {
  id: number;
  delta: number;
}

export const solution = (input: string[]): number => {
  let buses = parseInput(input);

  if (!buses.length) return 0;
  if (buses.length < 2) return buses[0].id;

  // sort by id (descending order)
  // this is an optimization that works since matching
  // the buses with the largest id first means we minimize
  // wasted effort
  buses.sort((a, b) => b.id - a.id);

  let jumpBy = buses[0].id;
  let timestamp = jumpBy;
  let delta = 0;

  // lock with other buses one at a time
  for (let i = 1; i < buses.length; i++) {
    delta = buses[i].delta - buses[0].delta;

    while ((timestamp + delta) % buses[i].id !== 0) {
      timestamp += jumpBy;
    }

    jumpBy *= buses[i].id;
  }

  return timestamp - buses[0].delta;
};

const parseInput = (input: string[]): Bus[] => {
  const buses: Bus[] = [];
  let delta = 0;

  for (let ch of input) {
    if (ch === 'x' && buses.length) delta++;
    else if (!isNaN(ch as any)) buses.push({id: Number(ch), delta: delta++});
  }

  return buses;
};

if (require.main === module) {
  const [_, raw] = readFile(__dirname).split('\n');
  const input = raw.split(',');
  console.log(solution(input));
}
