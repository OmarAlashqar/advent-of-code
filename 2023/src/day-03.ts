import readFile from './common/readFile';

const dirs = [[-1, 0], [+1, 0], [0, -1], [0, +1], [-1, -1], [-1, +1], [+1, -1], [+1, +1]];

const solutionPart1 = (input: string[]) => {
  const height = input.length;
  const width = input[0].length;
  const getAt = (row, col) => {
    if (row < 0 || row >= height || col < 0 || col >= width) return '.';
    return input[row][col];
  }

  // 1 - this matrix tracks whether a position is adjacent to a symbol
  const adjacency: boolean[][] = [];
  for (let [row, line] of input.entries()) {
    const rowAdjacency = Array(line.length).fill(false);

    // check for each value
    for (let [col, char] of line.split("").entries()) {
      // check surrounding values
      for (let [dx, dy] of dirs) {
        if (getAt(row + dy, col + dx).match(/[\d\.]/) == null) {
          rowAdjacency[col] = true;
          break;
        }
      }
    }

    adjacency.push(rowAdjacency);
  }

  // 2 - consume digit by digit
  let sum = 0;
  let buffer = "";
  let adjacent = false;
  const evalBuffer = () => {
    let value = 0;
    if (buffer && adjacent) value = Number(buffer);
    buffer = "";
    adjacent = false;
    return value;
  };
  for (let [row, line] of input.entries()) {
    for (let [col, char] of line.split("").entries()) {
      if (char.match(/\d/) != null) {
        buffer += char;
        adjacent ||= adjacency[row][col];
      } else {
        sum += evalBuffer();
      }
    }
    sum += evalBuffer();
  }

  return sum;
};

const solutionPart2 = (input: string[]) => {
  const height = input.length;
  const width = input[0].length;
  const getAt = (row, col) => {
    if (row < 0 || row >= height || col < 0 || col >= width) return '.';
    return input[row][col];
  }

  // consume digit by digit
  let buffer = "";
  let adjacentGears = new Set<string>();
  const valuesByGear: Map<string, number[]> = new Map();

  const evalBuffer = () => {
    const value = Number(buffer);
    for (let key of adjacentGears) {
      if (key in valuesByGear) valuesByGear[key].push(value);
      else valuesByGear[key] = [value];
    }
    buffer = "";
    adjacentGears = new Set();
  }

  for (let [row, line] of input.entries()) {
    for (let [col, char] of line.split("").entries()) {
      if (char.match(/\d/) != null) {
        buffer += char;
        for (let [dx, dy] of dirs) {
          if (getAt(row + dy, col + dx) == '*') {
            adjacentGears.add(`${row + dy}:${col + dx}`);
          }
        }
      } else {
        evalBuffer();
      }
    }
    evalBuffer();
  }

  return Object.values(valuesByGear).reduce((sum, values: number[]) => {
    return sum + (values.length == 2 ? values[0] * values[1] : 0);
  }, 0);
};

if (require.main === module) {
  const input = readFile('day-03.txt').split('\n');
  // answer: 525119
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 76504829
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
