// answer: 66020135789767
import readFile from '../common/readFile';

// I'm going to regret this later, but I'm not going to build the image yet.
// I only need to find the IDs of the corner tiles, which can be done without
// figuring out the actual tiling. We just need to know which ones have 2 adjacent tiles.

interface Tile {
  id: number;
  data: string[];
  edges: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
}

export const solution = (input: Tile[]): number => {
  const len = Math.sqrt(input.length);
  if (!Number.isInteger(len)) {
    throw new Error(`Cannot build square image given ${input.length} tiles`);
  }

  const lookup: Map<string, number> = new Map();
  const track: Map<number, number> = new Map();

  for (let tile of input) {
    // generate list of 8 edges, corresponding to each edge & its reversed counterpart
    let edges = Object.values(tile.edges);
    edges.push(...edges.map(id => id.split('').reverse().join('')));

    // try to match any of these 8 edges
    for (let edge of edges) {
      if (lookup.has(edge)) {
        const otherId = lookup.get(edge) as number;
        if (tile.id !== otherId) {
          // as a side effect, this double counts edges, so divide
          // by two when analyzing later
          track.set(otherId, (track.get(otherId) || 0) + 1);
          track.set(tile.id, (track.get(tile.id) || 0) + 1);
        }
      } else {
        lookup.set(edge, tile.id);
      }
    }
  }

  // look for corners (only 2 adjacent tiles),
  // while accounting for double counting
  let res = 1;
  for (let [id, adjX2] of track.entries()) {
    if (adjX2 / 2 === 2) res *= id;
  }

  return res;
};

const parseInput = (input: string): Tile[] => {
  const tilesStr = input.split('\n\n');
  return tilesStr.map(tileStr => {
    const [idStr, ...tileRows] = tileStr.split('\n');

    // parse tile ID
    const match = idStr.match(/Tile (\d+):/);
    if (!match) throw new Error(`Encountered invalid tile header: ${idStr}`);
    const id = Number(match[1]);

    // parse edges
    const top = tileRows[0];
    const bottom = tileRows[tileRows.length - 1];
    const left = tileRows.reduce((acc, row) => acc + row[0], '');
    const right = tileRows.reduce((acc, row) => acc + row[row.length - 1], '');

    return {id, data: tileRows, edges: {top, bottom, left, right}};
  });
};

if (require.main === module) {
  const raw = readFile(__dirname);
  const input = parseInput(raw);
  console.log(solution(input));
}
