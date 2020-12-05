// answer: 228
import readFile from '../common/readFile';

// doing this the long way with parsing instead of just checking for keys
// because I'm betting the 2nd part will have data validation

const parseRecord = (record: string): object => {
  return record
    .replace(/\n/gi, ' ')
    .split(' ')
    .reduce((acc: any, pair: string): object => {
      const [key, value] = pair.split(':');
      return {...acc, [key]: value};
    }, {});
};

// 'cid' is not a required field
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const validateRecord = (record: object): boolean => {
  for (let key of requiredFields) {
    if (!record.hasOwnProperty(key)) return false;
  }

  return true;
};

export const solution = (input: string) => {
  const records = input.split('\n\n');
  return records.reduce((acc: number, record: string): number => {
    return validateRecord(parseRecord(record)) ? acc + 1 : acc;
  }, 0);
};

(async () => {
  const raw = await readFile(__dirname);
  console.log(solution(raw));
})();
