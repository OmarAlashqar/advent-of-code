// answer: 4401465949086
import readFile from '../common/readFile';

// this one's going to be fun :')

const pad = (b: string, num = 36) => b.padStart(num, '0');

// fills in Xs with characters given in the filler string
const interpolate = (addrStrList: string[], filler: string): number => {
  let result = [];
  let fillerIdx = 0;

  for (let i = 0; i < addrStrList.length; i++) {
    result.push(addrStrList[i] === 'X' ? filler[fillerIdx++] : addrStrList[i]);
  }

  return parseInt(result.join(''), 2);
};

// address decoder
const getAddresses = (addrDecStr: string, mask: string): number[] => {
  const coldMask = BigInt(parseInt(mask.replace(/X/g, '0'), 2));
  const addrBits = pad((BigInt(addrDecStr) | coldMask).toString(2)).split('');

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === 'X') addrBits[i] = 'X';
  }

  const numXs = mask.match(/X/g)?.length || 0;
  const addresses: number[] = [];

  const len = Math.pow(2, numXs);
  for (let i = 0; i < len; i++) {
    const filler = pad(i.toString(2), numXs);
    addresses.push(interpolate(addrBits, filler));
  }

  return addresses;
};

export const solution = (input: string[]): number => {
  const mem: Map<number, number> = new Map();
  let mask = '';

  for (let line of input) {
    if (line[1] === 'a') {
      // mask command
      const match = line.match(/mask = ([X01]+)/);
      if (!match) throw new Error(`Encountered faulty command: ${line}`);

      mask = match[1];
    } else if (line[1] === 'e') {
      // mem command
      const match = line.match(/mem\[(\d+)\] = (\d+)/);
      if (!match) throw new Error(`Encountered faulty command: ${line}`);

      const addrDecStr = match[1];
      const value = Number(match[2]);

      getAddresses(addrDecStr, mask).forEach(addr => mem.set(addr, value));
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
