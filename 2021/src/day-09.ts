import readFile from './common/readFile';

// Part 1 was a simple search for cells with neighbors fitting a criteria.
// Part 2 is effectively a BFS/DFS to find all the basins (and their sizes).

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const parse = (input: string): number[][] =>
  input.split('\n').map(line => line.split('').map(v => Number.parseInt(v)));

const valid = (row: number, col: number, grid: number[][]): boolean =>
  row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

const solutionPart1 = (input: string) => {
  const isLow = (row: number, col: number, grid: number[][]): boolean => {
    for (let [drow, dcol] of DIRS) {
      const nrow = row + drow, ncol = col + dcol;
      if (valid(nrow, ncol, grid) && grid[nrow][ncol] <= grid[row][col]) return false;
    }
    return true;
  };
  
  const grid = parse(input);
  const height = grid.length, width = grid[0].length;

  // find low points
  const lowPoints: number[] = [];
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (isLow(row, col, grid)) {
        lowPoints.push(grid[row][col]);
      }
    }
  }

  return lowPoints.reduce((sum, v) => sum + (v + 1), 0);
};

const solutionPart2 = (input: string) => {
  const explore = (srow: number, scol: number, grid: number[][]): number => {
    const frontier: [number, number][] = [[srow, scol]];
    let size = 0;

    while (frontier.length > 0) {
      // consider expanding
      const [row, col] = frontier.pop()!;
      if (grid[row][col] === 9) continue;
      grid[row][col] = 9;
      size += 1;

      // mark potential exploration
      for (let [drow, dcol] of DIRS) {
        const nrow = row + drow, ncol = col + dcol;
        if (valid(nrow, ncol, grid) && grid[nrow][ncol] < 9) {
          frontier.push([nrow, ncol]);
        }
      }
    }

    return size;
  };

  const grid = parse(input);
  const height = grid.length;
  const width = grid[0].length;

  const basinSizes: number[] = [];
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (grid[row][col] < 9) {
        const basinSize = explore(row, col, grid);
        basinSizes.push(basinSize);
      }
    }
  }

  basinSizes.sort((a, b) => a - b);
  const largestThree = basinSizes.slice(-3, basinSizes.length);
  
  return largestThree.reduce((product, v) => product * v, 1);
};

if (require.main === module) {
  const input = readFile('day-09.txt');
  // answer: 633
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
