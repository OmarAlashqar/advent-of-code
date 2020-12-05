// answer: 175
import readFile from '../common/readFile';

// yup. parsing the records earlier makes this part a piece of cake.
// love me some validation rule maps :D

const parseRecord = (record: string): object => {
  return record
    .replace(/\n/gi, ' ')
    .split(' ')
    .reduce((acc: any, pair: string): object => {
      const [key, value] = pair.split(':');
      return {...acc, [key]: value};
    }, {});
};

const minmax = (n: number, min: number, max: number): boolean => n >= min && n <= max;

// 'cid' is not a required field
const rules = {
  byr: (v: string): boolean => Boolean(v.match(/^\d{4}$/)) && minmax(Number(v), 1920, 2002),
  iyr: (v: string): boolean => Boolean(v.match(/^\d{4}$/)) && minmax(Number(v), 2010, 2020),
  eyr: (v: string): boolean => Boolean(v.match(/^\d{4}$/)) && minmax(Number(v), 2020, 2030),
  hgt: (v: string): boolean => {
    const m = v.match(/^(\d+)(cm|in)$/);
    if (!m) return false;
    return (
      (m[2] === 'cm' && minmax(Number(m[1]), 150, 193)) ||
      (m[2] === 'in' && minmax(Number(m[1]), 59, 76))
    );
  },
  hcl: (v: string): boolean => Boolean(v.match(/#[0-9a-f]{6}/)),
  ecl: (v: string): boolean => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: (v: string): boolean => Boolean(v.match(/^[0-9]{9}$/)),
};

const validateRecord = (record: any): boolean => {
  for (let [key, rule] of Object.entries(rules)) {
    if (!(record.hasOwnProperty(key) && rule(record[key]))) return false;
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
