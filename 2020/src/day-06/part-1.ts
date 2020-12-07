// answer: 6703
import readFile from '../common/readFile';

// Sets are useful for de-duplication, just gonna take the easy route here

export const solution = (input: string): number => {
  const groups = input.split('\n\n');

  return groups.reduce((acc: number, group: string): number => {
    const letters = group.replace(/\n/gi, '').split('');
    return acc + new Set(letters).size;
  }, 0);
};

(async () => {
  const raw = await readFile(__dirname);
  console.log(solution(raw));
})();
