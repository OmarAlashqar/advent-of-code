// answer: 2832009600
import readFile from '../common/readFile';

// slope: [slopeRight, slopeDown]
export const solution = (map: string[], slopes: number[][]) => {
  return slopes.reduce((acc: number, slope: number[]): number => {
    return acc * subSolution(map, slope[0], slope[1]);
  }, 1);
};

// this is the solution from part-1
const subSolution = (map: string[], slopeRight: number, slopeDown: number): number => {
  const mapWidth = map[0].length;
  const pos = [0, 0]; // x, y
  let treeCount = 0;

  while (pos[1] < map.length) {
    if (map[pos[1]][pos[0]] === '#') treeCount++;
    pos[0] = (pos[0] + slopeRight) % mapWidth; // wrap around
    pos[1] += slopeDown;
  }

  return treeCount;
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  console.log(solution(raw, slopes));
}
