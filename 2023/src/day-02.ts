import readFile from './common/readFile';

const parseGame = roundsRaw => {
  return roundsRaw.split(";").map(round => // rounds
    round.trim().split(",").map(v => {// round
      const [num, color] = v.trim().split(" ") // single hand
      return [Number(num), color];
    })
  );
}

const solutionPart1 = (input: string[]) => {
  const elf_limits = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const isValidGame = rounds => {
    for (let round of rounds) {
      for (let hand of round) {
        if (elf_limits[hand[1]] < hand[0]) return false;
      }
    }
    return true;
  };

  return input.reduce((sum, line) => {
    const [gameRaw, roundsRaw] = line.split(":");
    const gameId = Number(gameRaw.split(" ")[1]);
    const rounds = parseGame(roundsRaw);
    return sum + (isValidGame(rounds) ? gameId : 0);
  }, 0);
};

const solutionPart2 = (input: string[]) => {
  return input.reduce((sum, line) => {
    const [_, roundsRaw] = line.split(":");
    const rounds = parseGame(roundsRaw);

    const max_map = { red: 0, green: 0, blue: 0 };
    for (let round of rounds) {
      for (let hand of round) {
        max_map[hand[1]] = Math.max(hand[0], max_map[hand[1]]);
      }
    }

    const product = Object.values(max_map).reduce((product, v) => product * v, 1);
    return sum + product;
  }, 0);
};

if (require.main === module) {
  const input = readFile('day-02.txt').split('\n');
  // answer: 2169
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 60948
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
