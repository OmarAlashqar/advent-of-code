import readFile from './common/readFile';

type Rules = { [key: string]: string };
type Polymers = { [pattern: string]: number };

const parse = (input: string): [Polymers, Rules] => {
  const [polymerRaw, rulesRaw] = input.split('\n\n');

  let polymer: Polymers = {};
  for (let i = 0; i < polymerRaw.length - 1; i++) {
    const pattern = `${polymerRaw[i]}${polymerRaw[i + 1]}`;
    if (pattern in polymer) polymer[pattern] += 1;
    else polymer[pattern] = 1;
  }

  const rules = rulesRaw.split('\n').reduce((map, rule) => {
    const [key, value] = rule.split(' -> ');
    return { ...map, [key]: value };
  }, {});

  return [polymer, rules];
};

const solutionPart1 = (input: string, steps: number) => {
  const [polymer, rules] = parse(input);

  for (let step = 0; step < steps; step++) {
    const patterns = Object.keys(polymer);
    const polymerCopy = { ...polymer };

    for (let pattern of patterns) {
      const times = polymerCopy[pattern];

      polymer[pattern] -= polymerCopy[pattern];
      if (polymer[pattern] == 0) delete polymer[pattern];
      
      const insert = rules[pattern];
      const newPatterns = [`${pattern[0]}${insert}`, `${insert}${pattern[1]}`];
      for (let newPattern of newPatterns) {
        if (newPattern in polymer) polymer[newPattern] += times;
        else polymer[newPattern] = times;
      }
    }
  }

  const freqMap = Object.entries(polymer)
    .flatMap(([pattern, times]) => [[pattern[0], times], [pattern[1], times]])
    .reduce((agg, [char, times]) => {
      if (char in agg) agg[char] += times;
      else agg[char] = times;
      return agg;
    }, {});

  const freqs = (Object.values(freqMap) as number[]).map(v => Math.ceil(v / 2));
  freqs.sort((a, b) => a - b);

  return freqs[freqs.length - 1] - freqs[0];
};

const solutionPart2 = solutionPart1;

if (require.main === module) {
  const input = readFile('day-14.txt');
  // answer: 3411
  console.log(`Result for Part 1: ${solutionPart1(input, 10)}`);
  // answer: 7477815755570
  console.log(`Result for Part 2: ${solutionPart2(input, 40)}`);
}
