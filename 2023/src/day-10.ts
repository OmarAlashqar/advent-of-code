import readFile from './common/readFile';

const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const to = new Map<number[], string>();
to.set(dirs[0], "S|7F"); // up
to.set(dirs[1], "S|LJ"); // down
to.set(dirs[2], "S-LF"); // left
to.set(dirs[3], "S-7J"); // right

const from = new Map<string, number[][]>();
from.set('-', [dirs[2], dirs[3]]) // left and right
from.set('|', [dirs[0], dirs[1]]) // up and down
from.set('F', [dirs[1], dirs[3]]) // down and right
from.set('7', [dirs[1], dirs[2]]) // down and left
from.set('J', [dirs[0], dirs[2]]) // up and left
from.set('L', [dirs[0], dirs[3]]) // up and right


const findStart = (input: string[]) => {
  for (let [row, line] of input.entries()) {
    const col = line.indexOf('S')
    if (col != -1) return [row, col];
  }
  return [-1, -1];
};


const solutionPart1 = (input: string[]) => {
  let [row, col] = findStart(input);

  const rows = input.length;
  const cols = input[0].length;
  const at = (row, col) => (row >= 0 && row < rows && col >= 0 && col < cols) ? input[row][col] : '.';

  let [pRow, pCol] = [-1, -1];
  let steps = 0;

  do {
    // scan surroundings and jump to first unvisited path
    const nextDirs = from.get(input[row][col])! || dirs;
    for (let dir of nextDirs) {
      const [cRow, cCol] = [row + dir[0], col + dir[1]];
      if (cRow == pRow && cCol == pCol) continue; // already visited
      if (to.get(dir)!.includes(at(cRow, cCol))) {
        pRow = row; pCol = col; // set marker on location 
        row = cRow; col = cCol; // move
        steps += 1;
        break;
      }
    }
  } while (input[row][col] != 'S');

  return steps / 2;
};

const solutionPart2 = (input: string[]) => {
  let [row, col] = findStart(input);

  const rows = input.length;
  const cols = input[0].length;
  const at = (row, col) => (row >= 0 && row < rows && col >= 0 && col < cols) ? input[row][col] : '.';

  // 1. index loop

  const loop = new Set<string>();
  let [pRow, pCol] = [-1, -1];
  do {
    // scan surroundings and jump to first unvisited path
    const nextDirs = from.get(input[row][col])! || dirs;
    for (let dir of nextDirs) {
      const [cRow, cCol] = [row + dir[0], col + dir[1]];
      if (cRow == pRow && cCol == pCol) continue; // already visited
      if (to.get(dir)!.includes(at(cRow, cCol))) {
        loop.add(`${row},${col}`); // index location
        pRow = row; pCol = col; // set marker on location 
        row = cRow; col = cCol; // move
        break;
      }
    }
  } while (input[row][col] != 'S');

  // 2. scan input and count enclosed tiles

  let tiles = 0;
  for (let row = 0; row < rows; row++) {
    let enclosed = false;
    for (let col = 0; col < cols; col++) {
      const key = `${row},${col}`;
      if (loop.has(key) && "|JL".includes(input[row][col])) enclosed = !enclosed; // crossed boundary
      else if (enclosed && !loop.has(key)) tiles += 1; // enclosed tile
    }
  }

  return tiles;
};

if (require.main === module) {
  const input = readFile('day-10.txt').split('\n');
  // answer: 7097
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 355
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
