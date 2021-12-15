import readFile from './common/readFile';

const DIRS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 0], [0, 1],
  [1, -1], [1, 0], [1, 1],
];

const parse = (input: string): number[][] =>
  input.split('\n').map(line => line.split('').map(v => Number.parseInt(v)));

const valid = (row: number, col: number, grid: number[][]): boolean =>
  row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;

const solutionPart1 = (input: string, steps: number) => {
  const grid = parse(input);
  const height = grid.length;
  const width = grid[0].length;

  let flashes = 0;
  for (let step = 0; step < steps; step++) {
    let frontier: [number, number][] = [];

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (grid[row][col] == -1) grid[row][col] += 2;
        else grid[row][col] += 1;

        if (grid[row][col] == 10) frontier.push([row, col]);
      }
    }

    while (frontier.length > 0) {
      const nextFrontier: [number, number][] = [];

      for (let [row, col] of frontier) {
        grid[row][col] = -1;
        flashes += 1;
        for (let [drow, dcol] of DIRS) {
          const nrow = row + drow, ncol = col + dcol;
          if (!valid(nrow, ncol, grid)) continue;
          if (grid[nrow][ncol] >= 0 && grid[nrow][ncol] <= 9) {
            grid[nrow][ncol] += 1;
            if (grid[nrow][ncol] == 10) nextFrontier.push([nrow, ncol]);
          }
        }
      }

      frontier = nextFrontier;
    }
  }

  return flashes;
};

const solutionPart2 = (input: string) => {
  const allFlashed = (grid: number[][]): boolean =>
    !(grid.flat().filter(v => v != -1).length > 0);


  const grid = parse(input);
  const height = grid.length;
  const width = grid[0].length;

  let step = 0;
  while (true) {
    step += 1;

    let frontier: [number, number][] = [];

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (grid[row][col] == -1) grid[row][col] += 2;
        else grid[row][col] += 1;

        if (grid[row][col] == 10) frontier.push([row, col]);
      }
    }

    while (frontier.length > 0) {
      const nextFrontier: [number, number][] = [];

      for (let [row, col] of frontier) {
        grid[row][col] = -1;
        for (let [drow, dcol] of DIRS) {
          const nrow = row + drow, ncol = col + dcol;
          if (!valid(nrow, ncol, grid)) continue;
          if (grid[nrow][ncol] >= 0 && grid[nrow][ncol] <= 9) {
            grid[nrow][ncol] += 1;
            if (grid[nrow][ncol] == 10) nextFrontier.push([nrow, ncol]);
          }
        }
      }
      
      frontier = nextFrontier;
    }

    if (allFlashed(grid)) return step;
  }
};

if (require.main === module) {
  const input = readFile('day-11.txt');
  // answer: 1713
  console.log(`Result for Part 1: ${solutionPart1(input, 100)}`);
  // answer: 502
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
