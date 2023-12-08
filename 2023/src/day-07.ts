import readFile from './common/readFile';


const getType = freqs => {
  const values = Object.values(freqs);
  values.sort();
  const str = values.join(",");

  if (['5', '4', '3', '2', '1', ''].includes(str)) return '6';  // Five of a Kind
  else if (['1,4', '1,1', '1,2', '1,3'].includes(str)) return '5'; // Four of a Kind
  else if (['2,3', '2,2'].includes(str)) return '4'; // Full House
  else if (['1,1,3', '1,1,1', '1,1,2'].includes(str)) return '3'; // Three of a Kind
  else if (['1,2,2'].includes(str)) return '2'; // Two Pair
  else if (['1,1,1,2', '1,1,1,1'].includes(str)) return '1'; // One Pair
  else if (['1,1,1,1,1'].includes(str)) return '0'; // High card
  else return 'Z';
};



const solutionPart1 = (input: string[]) => {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  const cardTranslations = cards.reduce((map, char, idx) => ({ ...map, [char]: String.fromCharCode(65 + idx) }), {});

  const parse = (sets: string[][]) => {
    return sets.map(set => {
      const freq = {};
      let translated = "";

      for (let char of set[0]) {
        if (!(char in freq)) freq[char] = 0;
        freq[char] += 1;
        translated += cardTranslations[char];
      }

      return [getType(freq) + translated, set[1]];
    });
  }

  const sets = input.map(line => line.split(" "));
  const parsed = parse(sets);
  parsed.sort((a, b) => a[0] < b[0] ? -1 : +1);
  return parsed.reduce((sum, set, idx) => sum + Number(set[1]) * (idx + 1), 0);
};

const solutionPart2 = (input: string[]) => {
  const cards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
  const cardTranslations = cards.reduce((map, char, idx) => ({ ...map, [char]: String.fromCharCode(65 + idx) }), {});

  const parse = (sets: string[][]) => {
    return sets.map(set => {
      const freq = {};
      let translated = "";

      for (let char of set[0]) {
        translated += cardTranslations[char];
        if (!(char in freq)) freq[char] = 1;
        else freq[char] += 1;
      }

      delete freq['J'];
      return [getType(freq) + translated, set[1]];
    });
  }

  const sets = input.map(line => line.split(" "));
  const parsed = parse(sets);
  parsed.sort((a, b) => a[0] < b[0] ? -1 : +1);
  return parsed.reduce((sum, set, idx) => sum + Number(set[1]) * (idx + 1), 0);
};

if (require.main === module) {
  // const input = readFile('day-07.debug.txt').split('\n');
  const input = readFile('day-07.txt').split('\n');
  // answer: 251216224
  console.log(`Result for Part 1: ${solutionPart1(input)}`);
  // answer: 250825971
  console.log(`Result for Part 2: ${solutionPart2(input)}`);
}
