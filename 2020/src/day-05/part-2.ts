// answer: 743
import readFile from '../common/readFile';

interface Seat {
  row: number;
  column: number;
}

const getSeatID = (seat: Seat) => 8 * seat.row + seat.column;

// not worth abstracting repeated internal functionality into separate function, reduces ease of understanding
const parseSeat = (seat: string): Seat => {
  const rowRange = [0, 127];
  for (let i = 0; i < 7; i++) {
    const delta = Math.ceil((rowRange[1] - rowRange[0]) / 2);
    if (seat[i] === 'F') rowRange[1] -= delta;
    else if (seat[i] === 'B') rowRange[0] += delta;
  }

  const colRange = [0, 7];
  for (let i = 7; i < 10; i++) {
    const delta = Math.ceil((colRange[1] - colRange[0]) / 2);
    if (seat[i] === 'L') colRange[1] -= delta;
    else if (seat[i] === 'R') colRange[0] += delta;
  }

  return {row: rowRange[0], column: colRange[0]};
};

export const solution = (input: string[]): number => {
  const seatIDs = input.map(parseSeat).map(getSeatID);
  seatIDs.sort((a, b) => a - b);

  for (let i = 0; i < seatIDs.length; i++) {
    // problem statement guarantees this condition to happen in non-inclusive interval (0, seatIDs.length -1),
    // so checking ahead is safe since seat won't be first/last seat
    if (seatIDs[i] + 2 === seatIDs[i + 1]) return seatIDs[i] + 1;
  }

  // this should never happen
  return -1;
};

(async () => {
  const raw = (await readFile(__dirname)).split('\n');
  console.log(solution(raw));
})();
