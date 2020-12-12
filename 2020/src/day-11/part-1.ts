// answer: 2265
import readFile from '../common/readFile';

// Conway's Game of Life cellular automata vibes :)
// I won't do this often, but gonna do this one as a Class

enum Seat {
  TAKEN = '#',
  FREE = 'L',
  NA = '.',
}

export class Grid {
  // list of [row, column] - top then clockwise
  protected static DELTAS = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  protected grid: string[][];

  constructor(grid: string[][]) {
    // clones grid array
    this.grid = grid.map(row => [...row]);
  }

  static fromString = (input: string) => {
    return new Grid(input.split('\n').map(row => row.split('')));
  };

  tick = () => {
    const nextGrid = new Grid(this.grid);

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        nextGrid.grid[i][j] = this.tickPosition(i, j);
      }
    }

    return nextGrid;
  };

  equals = (otherGrid: Grid): boolean => {
    if (this.grid.length != otherGrid.grid.length) return false;

    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i].length != otherGrid.grid[i].length) return false;

      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] != otherGrid.grid[i][j]) return false;
      }
    }

    return true;
  };

  countOccupied = (): number => {
    return this.grid.reduce(
      (acc, row) => acc + row.reduce((acc, cell) => acc + (cell === Seat.TAKEN ? 1 : 0), 0),
      0
    );
  };

  protected validPosition = (row: number, column: number): boolean => {
    return row >= 0 && row < this.grid.length && column >= 0 && column < this.grid[row].length;
  };

  protected tickPosition = (row: number, column: number): string => {
    const currentStatus = this.grid[row][column];

    if (currentStatus === Seat.NA) return Seat.NA;

    const numOccupied = Grid.DELTAS.reduce((acc, delta) => {
      const offsetRow = row + delta[0];
      const offsetColumn = column + delta[1];

      if (
        this.validPosition(offsetRow, offsetColumn) &&
        this.grid[offsetRow][offsetColumn] === Seat.TAKEN
      )
        return acc + 1;

      return acc;
    }, 0);

    if (currentStatus === Seat.FREE && numOccupied === 0) return Seat.TAKEN;
    else if (currentStatus === Seat.TAKEN && numOccupied >= 4) return Seat.FREE;

    return currentStatus;
  };
}

export const solution = (input: string): number => {
  let prevGrid = Grid.fromString(input);
  let grid = prevGrid.tick();

  while (!grid.equals(prevGrid)) {
    prevGrid = grid;
    grid = prevGrid.tick();
  }

  return grid.countOccupied();
};

if (require.main === module) {
  const raw = readFile(__dirname);
  console.log(solution(raw));
}
