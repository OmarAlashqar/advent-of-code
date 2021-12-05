import readFile from './common/readFile';

enum Type { HORIZONTAL, VERTICAL, DIAG_L, DIAG_R }

type WithType = {
  type: Type;
};

type Line = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

const withType = (line: Line): Line & WithType => {
  if (line.fromX == line.toX) return { ...line, type: Type.VERTICAL };
  else if (line.fromY == line.toY) return { ...line, type: Type.HORIZONTAL };
  else if (line.fromX < line.toX) return { ...line, type: Type.DIAG_R };
  else return { ...line, type: Type.DIAG_L };
};

const parse = (input: string[]): (Line & WithType)[] => {
  return input.map(line => {
    const [x1, y1, x2, y2] = line
      .split(' -> ')
      .flatMap(coord => coord.split(','))
      .map(v => Number.parseInt(v));

    if (y1 < y2) return withType({ fromX: x1, fromY: y1, toX: x2, toY: y2 });
    else if (y2 < y1) return withType({ fromX: x2, fromY: y2, toX: x1, toY: y1 });
    else if (x1 < x2) return withType({ fromX: x1, fromY: y1, toX: x2, toY: y2 });
    else return withType({ fromX: x2, fromY: y2, toX: x1, toY: y1 });
  });
};

const encode = (x: number, y: number) => `${x}-${y}`;

const getNumberIntersections = (segments: (Line & WithType)[]) => {
  const pointSet = new Set<string>();
  const overlapSet = new Set<string>();
  
  for (let segment of segments) {
    const dx = [Type.HORIZONTAL, Type.DIAG_R].includes(segment.type) ? +1 : segment.type == Type.DIAG_L ? -1 : 0;
    const dy = [Type.VERTICAL, Type.DIAG_L, Type.DIAG_R].includes(segment.type) ? +1 : 0;
    let x = segment.fromX, y = segment.fromY;
    while (((segment.type == Type.DIAG_L && x >= segment.toX) || x <= segment.toX) && y <= segment.toY) {
      const encoded = encode(x, y);
      if (pointSet.has(encoded)) overlapSet.add(encoded);
      else pointSet.add(encoded);
      x += dx;
      y += dy;
    }
  }

  return overlapSet.size;
};

const solutionPart1 = (input: string[]) => {
  // only consider horizontal and vertical segments
  const segments = parse(input).filter(({ type }) => [Type.HORIZONTAL, Type.VERTICAL].includes(type));
  return getNumberIntersections(segments);
};

const solutionPart2 = (input: string[]) => {
  const segments = parse(input);
  return getNumberIntersections(segments);
};

if (require.main === module) {
  const input = readFile('day-05.txt').split('\n');
  // answer: 4745
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 18442
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
