// answer: 35397
import readFile from '../common/readFile';

// if I were to make this efficient, I'd use a linked list
// since we only care about the top and bottom of the deck

type Deck = number[];
interface Input {
  deck1: Deck;
  deck2: Deck;
}

export const solution = (input: Input): number => {
  const deck1 = [...input.deck1];
  const deck2 = [...input.deck2];

  // combat till one deck runs out
  while (deck1.length > 0 && deck2.length > 0) {
    const card1 = deck1.shift() as number;
    const card2 = deck2.shift() as number;

    if (card1 > card2) deck1.push(card1, card2);
    else if (card2 > card1) deck2.push(card2, card1);
    else throw new Error('Encountered matching cards, no rule for draw');
  }

  // calculate weighted sum
  const deck = deck1.length > 0 ? deck1 : deck2;
  return deck.reduce((acc, card, idx) => acc + card * (deck.length - idx), 0);
};

const parseInput = (input: string): Input => {
  const decks = input.split('\n\n').map(deckStr => {
    const [_, ...cards] = deckStr.split('\n');
    return cards.map(v => Number(v));
  });

  return {deck1: decks[0], deck2: decks[1]};
};

if (require.main === module) {
  const raw = readFile(__dirname);
  const input = parseInput(raw);
  console.log(solution(input));
}
