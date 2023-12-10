import readFile from './common/readFile';

const solutionPart1 = (input: string[]) => {
  const predict = (values: number[]) => {
    if (values.every(v => v == 0)) return 0;

    const deltas: number[] = [];
    for (let i = 1; i < values.length; i++) {
      deltas.push(values[i] - values[i - 1]);
    }

    return values[values.length - 1] + predict(deltas);
  };

  return input.reduce((sum, line) => {
    const values = line.split(" ").map(v => Number(v));
    return sum + predict(values);
  }, 0);
};

const solutionPart2 = (input: string[]) => {
  const predict = (values: number[]) => {
    if (values.every(v => v == 0)) return 0;

    const deltas: number[] = [];
    for (let i = 1; i < values.length; i++) {
      deltas.push(values[i] - values[i - 1]);
    }

    return values[0] - predict(deltas);
  };

  return input.reduce((sum, line) => {
    const values = line.split(" ").map(v => Number(v));
    return sum + predict(values);
  }, 0);
};

if (require.main === module) {
  // const input = readFile('day-09.debug.txt').split('\n');
  const input = readFile('day-09.txt').split('\n');
  // answer: 1993300041
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 1038
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
