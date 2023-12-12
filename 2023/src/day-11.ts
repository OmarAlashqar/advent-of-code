import readFile from './common/readFile';

const cartesian = (list: number[][]) => {
  const result: number[][][] = [];
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++)
      result.push([list[i], list[j]]);
  return result;
};

const solve = (input: string[], expansion: number) => {
  const galaxies: number[][] = [];

  const rows = input.length;
  const cols = input[0].length;

  const rowExpands = Array(rows).fill(false);
  const colExpands = Array(cols).fill(false);

  // Find galaxies and figure out empty rows
  for (let row = 0; row < rows; row++) {
    const galaxiesSoFar = galaxies.length;
    for (let col = 0; col < cols; col++) {
      if (input[row][col] == '#') galaxies.push([row, col]);
    }
    rowExpands[row] = galaxies.length == galaxiesSoFar;
  }

  // Figure out empty columns
  for (let col = 0; col < cols; col++) {
    let galaxyInCol = false;
    for (let row = 0; row < rows; row++) {
      if (input[row][col] == '#') galaxyInCol = true;
    }
    colExpands[col] = !galaxyInCol;
  }

  return cartesian(galaxies).reduce((sum, [[row1, col1], [row2, col2]]) => {
    const [fRow, tRow] = [row1, row2].sort((a, b) => a - b);
    const [fCol, tCol] = [col1, col2].sort((a, b) => a - b);
    // base distance
    let dist = (tRow - fRow) + (tCol - fCol);
    // row expansions
    for (let row = fRow + 1; row < tRow; row++) {
      if (rowExpands[row]) dist += expansion - 1;
    }
    // column expansions
    for (let col = fCol + 1; col < tCol; col++) {
      if (colExpands[col]) dist += expansion - 1;
    }
    return sum + dist;
  }, 0);
};

const solutionPart1 = (input: string[]) => solve(input, 2);
const solutionPart2 = (input: string[]) => solve(input, 1000000);

if (require.main === module) {
  const input = readFile('day-11.txt').split('\n');
  // answer: 10173804
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 634324905172
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
