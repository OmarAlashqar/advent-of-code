import readFile from './common/readFile';

const dirs = [[-1, 0], [+1, 0], [0, -1], [0, +1]];

const findStart = (input: string[]) => {
  for (let [row, line] of input.entries()) {
    for (let [col, char] of line.split('').entries()) {
      if (char == 'S') return [row, col];
    }
  }
  return null;
};

const solutionPart1 = (input: string[]) => {
  const rows = input.length;
  const cols = input[0].length;
  const at = (row, col) => (row >= 0 && row < rows && col >= 0 && col < cols) ? input[row][col] : '#';

  let frontier = [findStart(input)!];
  for (let i = 0; i < 64; i++) {
    const neighbors = new Set<string>();
    for (let [row, col] of frontier) {
      for (let [dRow, dCol] of dirs) {
        if (".S".includes(at(row + dRow, col + dCol))) {
          neighbors.add(`${row + dRow}:${col + dCol}`);
        }
      }
    }
    frontier = [...neighbors.values()].map(s => s.split(":").map(v => Number(v)));
  }

  return frontier.length;
};

const solutionPart2 = (input: string[]) => {
  console.log(input);
};

if (require.main === module) {
  // const input = readFile('day-21.debug.txt').split('\n');
  const input = readFile('day-21.txt').split('\n');
  // answer: 3746
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 
  // console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
