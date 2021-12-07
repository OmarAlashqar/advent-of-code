import readFile from './common/readFile';

const solutionPart1 = (positions: number[]) => {
  const median = (values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 !== 0) return sorted[middle];
    return Math.ceil((sorted[middle - 1] + sorted[middle]) / 2);
  };
  
  const converge = median(positions);
  return positions.reduce((cost, pos) => cost + Math.abs(pos - converge), 0);
};

const solutionPart2 = (positions: number[]) => {
  const mean = (values: number[]) => {
    return Math.floor(values.reduce((sum, v) => sum + v, 0) / values.length);
  };

  const converge = mean(positions);
  return positions.reduce((cost, pos) => {
    const distance = Math.abs(pos - converge);
    // Gauss formula for sum: 1 + 2 + 3 + ... + n
    const currCost = (distance / 2) * (1 + distance);
    return cost + currCost;
  }, 0);
};

if (require.main === module) {
  const input = readFile('day-07.txt').split(',').map(v => Number(v));
  // answer: 337833
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 96678050
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
