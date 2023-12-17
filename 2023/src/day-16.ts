import readFile from './common/readFile';

enum Dir { up = 1, down, left, right };
type Ray = { row: number, col: number, dir: Dir };

const dirs = {
  [Dir.up]: [-1, 0],
  [Dir.left]: [0, -1],
  [Dir.down]: [+1, 0],
  [Dir.right]: [0, +1],
};

const reflection = {
  '\\': {
    [Dir.up]: Dir.left,
    [Dir.left]: Dir.up,
    [Dir.down]: Dir.right,
    [Dir.right]: Dir.down,
  },
  '/': {
    [Dir.up]: Dir.right,
    [Dir.left]: Dir.down,
    [Dir.down]: Dir.left,
    [Dir.right]: Dir.up,
  },
};

const solve = (grid: string[][], iv: Ray[]) => {
  const height = grid.length;
  const width = grid[0].length;

  // 2D matrix with Set of directions seen in that cell
  const visited = Array(height).fill(0).map(_ => Array(width).fill(0).map(_ => new Set<Dir>()));

  // Simulate all rays until exhaustion
  const rays = [...iv];
  while (rays.length > 0) {
    const ray = rays.pop()!;
    let fizzle = false;
    while (!fizzle) {
      const [dRow, dCol] = dirs[ray.dir];
      const row = ray.row + dRow;
      const col = ray.col + dCol;

      if (row < 0 || row >= height || col < 0 || col >= width) break;
      ray.row = row;
      ray.col = col;

      const char = grid[row][col];
      if (char == '|' && (ray.dir == Dir.left || ray.dir == Dir.right)) {
        rays.push({ row, col, dir: Dir.up });
        rays.push({ row, col, dir: Dir.down });
        fizzle = true;
      }
      else if (char == '-' && (ray.dir == Dir.up || ray.dir == Dir.down)) {
        rays.push({ row, col, dir: Dir.left });
        rays.push({ row, col, dir: Dir.right });
        fizzle = true;
      }
      else if (char == '\\' || char == '/') {
        ray.dir = reflection[char][ray.dir];
      }


      // Loop detected, break out
      if (visited[row][col].has(ray.dir)) break;
      visited[row][col].add(ray.dir);
    }
  }

  // Calculate number of visited cells

  let sum = 0;
  for (let row of visited)
    for (let set of row)
      if (set.size > 0)
        sum += 1;

  return sum;
};

const solutionPart1 = (input: string[]) => {
  const grid = input.map(line => line.split(''));
  return solve(grid, [{ row: 0, col: -1, dir: Dir.right }])
};

const solutionPart2 = (input: string[]) => {
  const grid = input.map(line => line.split(''));
  const height = grid.length;
  const width = grid[0].length;

  const ivs: Ray[] = [];

  // top & bottom edges
  for (let col = 0; col < width; col++) {
    ivs.push({ row: -1, col, dir: Dir.down });
    ivs.push({ row: height, col, dir: Dir.up });
  }
  // left & right edges
  for (let row = 0; row < height; row++) {
    ivs.push({ row, col: -1, dir: Dir.right });
    ivs.push({ row, col: width, dir: Dir.left });
  }

  return Math.max(...ivs.map(iv => solve(grid, [iv])));
};

if (require.main === module) {
  const input = readFile('day-16.txt').split('\n');
  // answer: 7242
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 7572
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
