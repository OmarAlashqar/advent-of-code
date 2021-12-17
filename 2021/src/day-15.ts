import readFile from './common/readFile';
import { PriorityQueue } from './common/PriorityQueue';

interface LNode {
  value: number;
  visited: boolean;
  observed: boolean;
  distance: number;
}

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const parse = (input: string): LNode[][] =>
  input.split('\n').map(line => line.split('')
    .map(v => ({ value: Number.parseInt(v), visited: false, distance: Infinity, observed: false })));

const valid = (row: number, col: number, grid: LNode[][]): boolean =>
  row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

const solutionPart1 = (grid: LNode[][]) => {
  const height = grid.length, width = grid[0].length;

  const unvisited = new PriorityQueue<[number, number]>();
  grid[0][0].distance = 0;
  let row = 0, col = 0;

  while (true) {
    for (let [drow, dcol] of DIRS) {
      const nrow = row + drow, ncol = col + dcol;

      if (!valid(nrow, ncol, grid) || grid[nrow][ncol].visited) continue;

      const newDistance = grid[row][col].distance + grid[nrow][ncol].value;

      if (newDistance < grid[nrow][ncol].distance) {
        grid[nrow][ncol].distance = newDistance;
        unvisited.changePriority([nrow, ncol], newDistance, (a, b) => a[0] == b[0] && a[1] == b[1]);
      }

      if (!grid[nrow][ncol].observed) {
        unvisited.enqueue([nrow, ncol], grid[nrow][ncol].distance);
        grid[nrow][ncol].observed = true;
      }
    }

    grid[row][col].visited = true;
    if (grid[height - 1][width - 1].visited) return grid[height - 1][width - 1].distance;

    [row, col] = unvisited.dequeue()!;
  }
};

const solutionPart2 = (grid: LNode[][], scale: number) => {
  const origHeight = grid.length, origWidth = grid[0].length;
  const height = origHeight * scale, width = origWidth * scale;

  const newGrid: LNode[][] = new Array(height);
  for (let row = 0; row < height; row++) newGrid[row] = new Array(width);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const baseRow = row % origHeight;
      const baseCol = col % origWidth;
      newGrid[row][col] = { ...grid[baseRow][baseCol] };
      const bonus = Math.floor(row / origHeight) + Math.floor(col / origWidth);
      const newValue = newGrid[row][col].value + bonus;
      newGrid[row][col].value = newValue % 10 + Math.floor(newValue / 10);
      if (newGrid[row][col].value == 0) newGrid[row][col].value = 1;
    }
  }

  return solutionPart1(newGrid);
};

if (require.main === module) {
  const input = readFile('day-15.txt');
  // answer: 685
  console.log(`Result for Part 1: ${solutionPart1(parse(input))}`);
  // answer: 2995
  console.log(`Result for Part 2: ${solutionPart2(parse(input), 5)}`);
}
