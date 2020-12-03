// answer: 240
import readFile from '../common/readFile';

export const solution = (map: string[], slopeRight: number, slopeDown: number): number => {
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

(async () => {
  const raw = await readFile(__dirname);
  console.log(solution(raw, 3, 1));
})();
