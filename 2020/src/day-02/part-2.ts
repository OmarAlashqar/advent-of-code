// answer: 737
import readFile from '../common/readFile';

// this solution uses regex matching for line parsing
export const solution = (input: string[]): number => {
  return input.reduce((acc: number, line: string): number => {
    const matches = line.match(/(\d+)-(\d+) (\w): (\w+)/);

    // error checking, shouldn't happen
    if (!matches || matches.length < 4) {
      console.log(`Skipping invalid line: ${line}`);
      return acc;
    }

    const [_, pos1, pos2, letter, password] = matches;

    // no input validation for pos1 or pos2 because meh
    // business logic
    if ((password[Number(pos1) - 1] == letter) !== (password[Number(pos2) - 1] == letter)) acc++;

    return acc;
  }, 0);
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw));
}
