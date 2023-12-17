import readFile from './common/readFile';

const transpose = (input: string[]) => {
  const output = Array(input[0].length).fill('');
  for (let line of input) {
    for (let [idx, char] of line.split('').entries()) {
      output[idx] += char;
    }
  }
  return output;
};

// No need to actually simulate moving rocks, we can just
// count rocks and figure out points as we go.
const solutionPart1 = (input: string[]) => {
  const columns = transpose(input);

  const rollLeftAndLoad = (column: string) => {
    const offsets: number[] = [0];
    for (let i = 0; i < column.length; i++)
      if (column[i] == '#') offsets.push(i + 1);
    const pts = column.length;
    const parts = column.split('#');
    return parts.reduce((load, part, idx) => {
      const rocks = part.split('').filter(c => c == 'O').length;
      for (let x = 0; x < rocks; x++) load += pts - offsets[idx] - x;
      return load;
    }, 0);
  };

  return columns.reduce((sum, column) => sum + rollLeftAndLoad(column), 0);
};

// This part's more complicated, needs actual rolling simulation
const solutionPart2 = (input: string[]) => {
  let grid = input.map(line => line.split(""));

  // Rotates 90 degrees clockwise
  const rotate = (grid: string[][]) => {
    const newGrid = Array(grid[0].length).fill(0).map(_ => Array(grid.length).fill(0));
    for (let i = 0; i < newGrid.length; i++)
      for (let j = 0; j < newGrid[0].length; j++)
        newGrid[i][j] = grid[grid[0].length - j - 1][i]
    return newGrid;
  };

  // Rolls every row to the right
  const roll = (grid: string[][]) => {
    return grid.map(row => {
      const parts = row.join('').split('#');
      const newParts = parts.map(p => p.split('').sort().join(''));
      return newParts.join('#').split('');
    });
  };

  // Roll grid enough times to match 1000000000 cycles

  const lastSeen = new Map<string, number>();
  let loops = 1000000000;
  let loop = 0;
  let ignoreLoop = false;

  while (loop < loops) {
    for (let i = 0; i < 4; i++) {
      grid = rotate(grid);
      grid = roll(grid);
    }

    if (!ignoreLoop) {
      const serialized = grid.join();
      if (lastSeen.has(serialized)) {
        // We found a loop!
        const loopSteps = loop - lastSeen.get(serialized)!;
        const stepsLeft = loops - loop - 1;
        const modulo = stepsLeft % loopSteps;
        loop = loops - modulo;
        ignoreLoop = true;
        continue;
      }
      lastSeen.set(serialized, loop);
    }

    loop++;
  }

  // Calculate load
  return grid.reduce((sum, row, idx) => {
    return sum + (row.filter(v => v == 'O').length * (grid.length - idx));
  }, 0);
};

if (require.main === module) {
  const input = readFile('day-14.txt').split('\n');
  // answer: 109345
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 112452
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
