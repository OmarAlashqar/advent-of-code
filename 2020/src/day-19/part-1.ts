// answer: 139
import readFile from '../common/readFile';

// i'm just going to build a regex and match each message against it.
// ezpz.

interface Input {
  rules: {[id: string]: string[]};
  messages: string[];
}

// returns a memoized function that can go from id -> string with only terminals
const getTranslator = (rules: {[id: string]: string[]}) => {
  const cache: {[id: string]: string} = {};

  const translate = (id: string): string => {
    if (!(id in rules)) throw new Error(`Missing rule id: ${id}`);
    if (id in cache) return cache[id];

    const rule = rules[id];

    const regex = rule
      .map(ch => {
        if (ch === '|' || !ch.match(/\d/)) return ch;
        if (id in cache) return cache[id];

        const tran = translate(ch);
        cache[ch] = tran;
        return tran;
      })
      .join('');

    return `(${regex})`;
  };

  return translate;
};

export const solution = (input: Input): number => {
  const translate = getTranslator(input.rules);
  const rgx = `^${translate('0')}$`;

  return input.messages.reduce((acc, message) => {
    if (message.match(rgx)) return acc + 1;
    return acc;
  }, 0);
};

const parseInput = (input: string): Input => {
  const result: Input = {rules: {}, messages: []};

  const [rulesStr, messagesStr] = input.split('\n\n');

  // parse rules
  const rulesStrList = rulesStr.split('\n');
  for (let rule of rulesStrList) {
    const match = rule.match(/(\d+): (.+)/);
    if (!match) throw new Error(`Encountered faulty rule: ${rule}`);

    const value = match[2].replace(/["]/g, '');
    result.rules[match[1]] = value.split(' ');
  }

  // parse messages
  result.messages = messagesStr.split('\n');

  return result;
};

if (require.main === module) {
  const raw = readFile(__dirname, 'input.1.txt');
  const input = parseInput(raw);
  console.log(solution(input));
}
