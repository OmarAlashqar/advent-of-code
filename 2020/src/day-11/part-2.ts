// answer: 2045
import readFile from '../common/readFile';
import {Grid as GridFromPart1} from './part-1';

// Compared to part-1, just a small change to how each position is checked in Grid::#tickPosition

enum Seat {
  TAKEN = '#',
  FREE = 'L',
  NA = '.',
}

// for brevity, I'll extend the Class from part-1
class Grid extends GridFromPart1 {
  tickPosition = (row: number, column: number): string => {
    const currentStatus = this.grid[row][column];

    if (currentStatus === Seat.NA) return Seat.NA;

    let numOccupied = 0;
    for (let i = 0; i < Grid.DELTAS.length; i++) {
      const delta = Grid.DELTAS[i];

      let offsetRow = row + delta[0];
      let offsetColumn = column + delta[1];

      while (
        this.validPosition(offsetRow, offsetColumn) &&
        this.grid[offsetRow][offsetColumn] === Seat.NA
      ) {
        offsetRow += delta[0];
        offsetColumn += delta[1];
      }

      if (
        this.validPosition(offsetRow, offsetColumn) &&
        this.grid[offsetRow][offsetColumn] === Seat.TAKEN
      )
        numOccupied++;
    }

    if (currentStatus === Seat.FREE && numOccupied === 0) return Seat.TAKEN;
    else if (currentStatus === Seat.TAKEN && numOccupied >= 5) return Seat.FREE;

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
