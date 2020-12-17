// answer: 296
import readFile from '../common/readFile';

// I love challenges that can be solved mathematically, makes me feel like a smarticle particle :-)

// returns how far away the target is from the next departure
const dist = (target: number, busID: number) => busID - (target % busID);

export const solution = (target: number, busIDs: number[]): number => {
  // simply find the bus that results in the minimum dist
  const closestBusID = busIDs.reduce(
    (acc, busID) => (dist(target, busID) < dist(target, acc) ? busID : acc),
    busIDs[0]
  );

  return closestBusID * dist(target, closestBusID);
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  const target = Number(raw[0]);
  const busIDs = raw[1]
    .split(',')
    .map(v => Number(v))
    .filter(v => !isNaN(v));
  console.log(solution(target, busIDs));
}
