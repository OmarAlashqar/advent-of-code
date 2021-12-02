import readFile from './common/readFile';

const solutionPart1 = (commands: string[]) => {
  let x = 0, y = 0;

  const func = {
    'down': v => y += v,
    'up': v => y -= v,
    'forward': v => x += v,
  };

  for (let command of commands) {
    const [type, amount] = command.split(' ');
    func[type](Number.parseInt(amount));
  }

  return x * y;
};

const solutionPart2 = (commands: string[]) => {
  let x = 0, y = 0, aim = 0;

  const func = {
    'down': v => aim += v,
    'up': v => aim -= v,
    'forward': v => {
      x += v;
      y += v * aim;
    },
  };

  for (let command of commands) {
    const [type, amount] = command.split(' ');
    func[type](Number.parseInt(amount));
  }

  return x * y;
};

if (require.main === module) {
  const input = readFile('day-02.txt').split('\n');
  // answer: 1660158
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 1604592846
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
