// answer: 737
import readFile from '../common/readFile';

// this solution uses regex matching for line parsing and occurrence checking
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

(async () => {
  const raw = await readFile(__dirname);
  console.log(solution(raw));
})();
