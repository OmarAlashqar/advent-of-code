import readFile from './common/readFile';

const transpose = (input: string[]) => {
  const output = Array(input[0].length).fill('');
  for (let line of input) {
    for (let [idx, char] of line.split('').entries()) {
      output[idx] += char;
    }
  }
  return output;
};

const checkMirror = (lines: string[], a: number, b: number) => {
  while (a >= 0 && b < lines.length) {
    if (lines[a] != lines[b]) return false;
    a--;
    b++;
  }
  return true;
};

const findMirror = (lines: string[]) => {
  for (let idx = 0; idx < lines.length - 1; idx++) {
    if (checkMirror(lines, idx, idx + 1)) {
      return idx;
    }
  }
  return -1;
};

const solutionPart1 = (patterns: string[]) => {
  return patterns.reduce((sum, pattern) => {
    const rows = pattern.split(/\n/);
    const horizontal = findMirror(rows);
    if (horizontal != -1) return sum + ((horizontal + 1) * 100);

    const columns = transpose(rows);
    const vertical = findMirror(columns);
    if (vertical != -1) return sum + vertical + 1;

    return sum;
  }, 0);
};

const solutionPart2 = (patterns: string[]) => {

  const almost = (a: string, b: string) => {
    let diffs = 0;
    for (let idx = 0; idx < Math.min(a.length, b.length); idx++) {
      if (a[idx] != b[idx]) diffs++;
    }
    return diffs <= 1;
  };

  const checkMirrorSmudged = (lines: string[], a: number, b: number) => {
    let used = false;
    while (a >= 0 && b < lines.length) {
      if (lines[a] != lines[b]) {
        if (used) return false;
        else if (almost(lines[a], lines[b])) used = true;
        else return false;
      }
      a--;
      b++;
    }
    return true;
  };

  const findMirrorSmudged = (lines: string[], ignore: number) => {
    for (let idx = 0; idx < lines.length - 1; idx++) {
      if (idx != ignore && checkMirrorSmudged(lines, idx, idx + 1)) {
        return idx;
      }
    }
    return -1;
  };

  return patterns.reduce((sum, pattern) => {
    const rows = pattern.split(/\n/);
    const horizontal1 = findMirror(rows);
    const horizontal2 = findMirrorSmudged(rows, horizontal1);
    if (horizontal2 != -1) return sum + ((horizontal2 + 1) * 100);

    const columns = transpose(rows);
    const vertical1 = findMirror(columns);
    const vertical2 = findMirrorSmudged(columns, vertical1);
    if (vertical2 != -1) return sum + vertical2 + 1;

    return sum;
  }, 0);
};

if (require.main === module) {
  // const input = readFile('day-13.debug.txt').split('\n\n');
  const input = readFile('day-13.txt').split('\n\n');
  // answer: 34911
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 33183
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
