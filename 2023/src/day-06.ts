import readFile from './common/readFile';

const quadratic = (a, b, c) => {
  const disc_sqrt = Math.sqrt(b ** 2 - 4 * a * c);
  return [(-b + disc_sqrt) / (2 * a), (-b - disc_sqrt) / (2 * a)]
};

const solutionPart1 = (input: string[]) => {
  const [times, distances] = input.map(line => line.match(/(\d+)/g)?.map(v => Number(v)));
  const races = times!.map((v, idx) => [v, distances![idx]]);

  const wins = races.map(([time, distance]) => {
    const roots = quadratic(-1, time, -distance);
    return Math.ceil(roots[1]) - Math.floor(roots[0]) - 1;
  });

  return wins.reduce((product, v) => product * v);
};

const solutionPart2 = (input: string[]) => {
  const [time, distance] = input.map(line => Number(line.match(/(\d+)/g)?.join("")));
  const roots = quadratic(-1, time, -distance);
  return Math.ceil(roots[1]) - Math.floor(roots[0]) - 1;
};

if (require.main === module) {
  const input = readFile('day-06.txt').split('\n');
  // answer: 771628
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 27363861
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
