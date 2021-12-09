import readFile from './common/readFile';

// This one involves finding the rules by inspection and problem solving,
// then just writing up these rules as code. Fun bit manipulation is specific
// to how I implemented this, but could've been sets of letters instead.

interface Display {
  patterns: string[];
  output: string[];
}

const parse = (input: string[]): Display[] => {
  return input.map(line => {
    const [patterns, output] = line.split(' | ').map(part => part.split(' '));
    return { patterns, output };
  });
};

// Encodes each segment signal as a unique binary number with a single 1 bit
const encodingMap = { 'a': 0x01, 'b': 0x02, 'c': 0x04, 'd': 0x08, 'e': 0x10, 'f': 0x20, 'g': 0x40 };
const numSegments = 7;

const encodeDigit = (digitStr: string): number => {
  let encoded = 0;
  for (let char of digitStr) encoded |= encodingMap[char];
  return encoded;
};

const countOnes = (b: number): number => {
  let num = 0;
  for (let i = 0; i < numSegments; i++) {
    num += b & 1;
    b >>= 1;
  }
  return num;
};

const determineMapping = (patterns: string[]): Map<Number, number> => {
  // *cough* subtle flex
  const groupedByLength = patterns.reduce((map, v) => ({ ...map, [v.length]: [...(map[v.length] || []), encodeDigit(v)] }), {});

  const encodedToDigit: Map<number, number> = new Map();
  encodedToDigit.set(groupedByLength[2][0], 1);
  encodedToDigit.set(groupedByLength[3][0], 7);
  encodedToDigit.set(groupedByLength[4][0], 4);
  encodedToDigit.set(groupedByLength[7][0], 8);

  const digitToEncoded: Map<number, number> = new Map();
  encodedToDigit.forEach((value, key) => digitToEncoded.set(value, key));

  for (let encoded of groupedByLength['5']) {
    if (countOnes(encoded & digitToEncoded.get(1)!) === 2) encodedToDigit.set(encoded, 3);
    else if (countOnes(encoded & digitToEncoded.get(4)!) === 3) encodedToDigit.set(encoded, 5);
    else encodedToDigit.set(encoded, 2);
  }
  
  for (let encoded of groupedByLength['6']) {
    if (countOnes(encoded & digitToEncoded.get(4)!) === 4) encodedToDigit.set(encoded, 9);
    else if (countOnes(encoded & digitToEncoded.get(1)!) === 2) encodedToDigit.set(encoded, 0);
    else encodedToDigit.set(encoded, 6);
  }

  return encodedToDigit;
};

const solutionPart1 = (input: string[]) => {
  const displays = parse(input);
  return displays.reduce((count, { output }) => count + output.filter(s => s.length != 6 && s.length != 5).length, 0);
};

const solutionPart2 = (input: string[]) => {
  const displays = parse(input);
  return displays.reduce((sum, display) => {
    const encodedToDigit = determineMapping(display.patterns);
    const valueStr = display.output.map(digitStr => encodedToDigit.get(encodeDigit(digitStr))).join('');
    const value = Number.parseInt(valueStr);
    return sum + value;
  }, 0);
};

if (require.main === module) {
  const input = readFile('day-08.txt').split('\n');
  // answer: 548
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 1074888
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
