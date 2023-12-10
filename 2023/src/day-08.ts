import readFile from './common/readFile';

const solutionPart1 = (input: string[]) => {
  const path = input.shift()!;
  input.shift(); // consume empty line

  // parse network
  const network = {};
  for (let line of input) {
    const [_, node, left, right] = line.match(/(.*) = \((.*), (.*)\)/)!;
    network[node] = [left, right];
  }

  // traverse network
  let current = "AAA";
  let steps = 0;
  while (current != "ZZZ") {
    for (let dir of path) {
      current = network[current][dir == 'L' ? 0 : 1];
      steps += 1;
    }
  }

  return steps;
};

const solutionPart2 = (input: string[]) => {
  const path = input.shift()!;
  input.shift(); // consume empty line

  let nodes: string[] = [];

  // parse network
  const network = {};
  for (let line of input) {
    const [_, node, left, right] = line.match(/(.*) = \((.*), (.*)\)/)!;
    network[node] = [left, right];
    if (node.endsWith('A')) nodes.push(node);
  }

  // individually traverse starting points
  const steps = nodes.map(current => {
    let steps = 0;
    while (!current.endsWith("Z")) {
      for (let dir of path) {
        current = network[current][dir == 'L' ? 0 : 1];
        steps += 1;
      }
    }
    return steps;
  });

  // Answer is LCM of all traversal step counts.
  // This works because the input is structured in a specific way
  // that leads closed loops!

  const gcd = (a, b) => !b ? a : gcd(b, a % b);
  const lcm = (a, b) => (a * b) / gcd(a, b);

  return steps.reduce(lcm, 1);
};

if (require.main === module) {
  // const input = readFile('day-08.debug.txt').split('\n');
  const input = readFile('day-08.txt').split('\n');
  // answer: 13301
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 7309459565207
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
