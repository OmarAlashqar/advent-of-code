import readFile from './common/readFile';

// Instead of getting the most/least common value per digit,
// this could've been solved by generating a trie from the input
// and easily reading off the answers from it. Overall, a trie
// solution would be O(n) since the depth is a constant.

const getFreq = (bitStrings: string[]) => {
  const nBits = bitStrings[0].length;
  const freq: number[] = new Array(nBits).fill(0);

  // determine freq of '1' and '0' for each position
  for (let bitString of bitStrings) {
    for (let i = 0; i < nBits; i++) {
      freq[i] += bitString[i] == '1' ? +1 : -1;
    }
  }

  return freq;
};

const solutionPart1 = (bitStrings: string[]) => {
  const nBits = bitStrings[0].length;
  const freq = getFreq(bitStrings);
 
  // build gamma value
  const gamma = Number.parseInt(freq.map(v => v > 0 ? '1' : '0').join(''), 2);
  // bit manipulation to find this value (flip every bit)
  // this is safe since JS bit operators are 32-bit, which is bigger than the input's 5-bit bit strings
  const epsilon = ~gamma & (Math.pow(2, nBits) - 1);

  return gamma * epsilon;
};

const solutionPart2 = (bitStrings: string[]) => {
  
  const rates = [0, 0];
  const mappers = [
    v => v >= 0 ? '1' : '0',
    v => v >= 0 ? '0' : '1',
  ];
  
  for (let i = 0; i < 2; i++) {
    let candidates = bitStrings;
    let filterIdx = 0;
    const mapper = mappers[i];

    while (candidates.length > 1) {
      const nextCandidates: string[] = [];
      const freq = getFreq(candidates).map(mapper);
      
      for (let bitString of candidates) {
        if (bitString[filterIdx] == freq[filterIdx]) {
          nextCandidates.push(bitString);
        }
      }

      filterIdx += 1;
      candidates = nextCandidates;
    }

    rates[i] = Number.parseInt(candidates[0], 2);
  }

  return rates[0] * rates[1];
};

if (require.main === module) {
  const input = readFile('day-03.txt').split('\n');
  // answer: 4118544
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 3832770
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
