// answer: 645
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

    const [_, min, max, letter, password] = matches;

    // business logic
    const occurrences = password.match(new RegExp(letter, 'gi'))?.length || 0;
    if (occurrences >= Number(min) && occurrences <= Number(max)) acc++;

    return acc;
  }, 0);
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw));
}
