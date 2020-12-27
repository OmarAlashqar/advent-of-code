// answer: 290726428573651
import readFile from '../common/readFile';
import {solution as solutionFromPart1, PrecedenceMap} from './part-1';

// Only change from part-1 is precedence of operations

const PRECEDENCE: PrecedenceMap = {'+': 1, '*': 0};

export const solution = (input: string[]): number => {
  return solutionFromPart1(input, PRECEDENCE);
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw));
}
