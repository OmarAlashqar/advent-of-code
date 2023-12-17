import readFile from './common/readFile';

const hash = (str: string) => {
  let value = 0;
  for (let char of str) value = ((value + char.charCodeAt(0)) * 17) % 256;
  return value;
};

const solutionPart1 = (input: string[]) => {
  return input.reduce((sum, str) => sum + hash(str), 0);
};

const solutionPart2 = (input: string[]) => {
  type Entry = { label: string, value: string };
  const map: Entry[][] = Array(256).fill(0).map(_ => []);

  input.forEach(instruction => {
    const [[_, label, op, value]] = instruction.matchAll(/(\w+)([-=])(\d+)?/g);
    const slot = hash(label);
    const idx = map[slot].map(e => e.label).indexOf(label);
    if (op == '=') {
      if (idx == -1) map[slot].push({ label, value });
      else map[slot][idx].value = value;
    } else if (op == '-' && idx != -1) {
      map[slot].splice(idx, 1);
    }
  });

  return map.reduce((sum, entries, idx) => {
    return sum + entries.reduce((acc, entry, slot) => {
      return acc + (idx + 1) * (slot + 1) * Number(entry.value);
    }, 0);
  }, 0);
};

if (require.main === module) {
  const input = readFile('day-15.txt').split(',');
  // answer: 514025
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
