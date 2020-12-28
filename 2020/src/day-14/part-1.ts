// answer: 17765746710228
import readFile from '../common/readFile';

// ayy bit manipulation, my jam! hype!

// after questioning life, I stumbled upon this piece from the js documentation:
// "JavaScript stores numbers as 64 bits floating point numbers, but all bitwise operations are performed on 32 bits binary numbers."

// this means we can't use the built-in bitwise operations on our 36-bit masks and values :(
// nevertheless, the BigInt type implements bitwise operations for wider numbers! woo!

export const solution = (input: string[]): number => {
  const mem: Map<number, number> = new Map();

  let coldMask = BigInt(0x000000000); // has 'X's replaced with '0's
  let hotMask = BigInt(0xfffffffff); // has 'X's replaced with '1's

  for (let line of input) {
    if (line[1] === 'a') {
      // mask command
      const match = line.match(/mask = ([X01]+)/);
      if (!match) throw new Error(`Encountered faulty command: ${line}`);

      const mask = match[1];
      coldMask = BigInt(parseInt(mask.replace(/X/g, '0'), 2));
      hotMask = BigInt(parseInt(mask.replace(/X/g, '1'), 2));
    } else if (line[1] === 'e') {
      // mem command
      const match = line.match(/mem\[(\d+)\] = (\d+)/);
      if (!match) throw new Error(`Encountered faulty command: ${line}`);

      const addr = Number(match[1]);
      const value = BigInt(match[2]);

      // the real magic happens here, behold!
      mem.set(addr, Number((value | coldMask) & hotMask));
    }
  }

  let sum = 0;
  for (let v of mem.values()) sum += v;

  return sum;
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw));
}
