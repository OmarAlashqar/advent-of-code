import readFile from './common/readFile';

type Board = string[][];
interface BoardSets {
  board: Board;
  sets: Set<string>[];
}

// parses an input file
const parse = (input: string): [string[], Board[]] => {
  const sections = input.split('\n\n');
  const draws = sections[0].split(',');

  const boards: Board[] = [];
  for (let i = 1; i < sections.length; i++) {
    boards.push(sections[i].split('\n').map(row => row.trim().split(/[ ]+/)));
  }

  return [draws, boards];
};

// generates sets representing rows and columns of the board
const generateBoardSets = (board: Board): Set<string>[] => {
  const sets: Set<string>[] = [];
  
  // add rows
  for (let row of board) sets.push(new Set(row));

  // add columns
  for (let c = 0; c < board.length; c++) {
    const set = new Set<string>();
    for (let r = 0; r < board.length; r++) set.add(board[r][c]);
    sets.push(set);
  }

  return sets;
};

const isSuperSet = (a: Set<string>, b: Set<string>): boolean => {
  for (let value of b.values()) if (!a.has(value)) return false;
  return true;
};

const calculateScore = (board: Board, drawn: string[]): number => {
  const allValues = board.flat(1);
  const drawnSet = new Set(drawn);
  const unmarked = allValues.filter(v => !drawnSet.has(v));
  const unmarkedSum = unmarked.reduce((agg, v) => agg + Number.parseInt(v), 0);
  return unmarkedSum * Number.parseInt(drawn[drawn.length - 1]);
};

const checkWins = (sets: Set<string>[], drawn: string[], drawnSet: Set<string>): boolean => {
  for (let winningSet of sets) if (isSuperSet(drawnSet, winningSet)) return true;
  return false;
};

const solutionPart1 = (draws: string[], boards: Board[]) => {
  const candidates: BoardSets[] = boards.map(board => ({ sets: generateBoardSets(board), board }));

  const drawn: string[] = [];
  const drawnSet = new Set<string>();
  for (let drawIdx = 0; drawIdx < draws.length; drawIdx++) {
    // draw next value
    drawn.push(draws[drawIdx]);
    drawnSet.add(draws[drawIdx]);

    // filter down boards
    for (let candidate of candidates) {
      if (checkWins(candidate.sets, drawn, drawnSet)) {
        // first winning board found
        return calculateScore(candidate.board, drawn);
      }
    }
  }

  return null;
};

const solutionPart2 = (draws: string[], boards: Board[]) => {
  let candidates: BoardSets[] = boards.map(board => ({ sets: generateBoardSets(board), board }));

  const drawn: string[] = [];
  const drawnSet = new Set<string>();
  for (let drawIdx = 0; drawIdx < draws.length; drawIdx++) {
    let nextCandidates: BoardSets[] = [];

    // draw next value
    drawn.push(draws[drawIdx]);
    drawnSet.add(draws[drawIdx]);

    // filter down boards
    if (candidates.length == 1) {
      if (checkWins(candidates[0].sets, drawn, drawnSet)) {
        // last winning board found
        return calculateScore(candidates[0].board, drawn);
      }
      nextCandidates.push(candidates[0]);
    } else {
      for (let candidate of candidates) {
        if (!checkWins(candidate.sets, drawn, drawnSet)) {
          nextCandidates.push(candidate);
        }
      }
    }

    candidates = nextCandidates;
  }

  return null;
};

if (require.main === module) {
  const input = readFile('day-04.txt');
  const [draws, boards] = parse(input);
  // answer: 23177
  console.log(`Result for Part 1: ${solutionPart1(draws, boards)}`);
  // answer: 6804
  console.log(`Result for Part 2: ${solutionPart2(draws, boards)}`);
}
