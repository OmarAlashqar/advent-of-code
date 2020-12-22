// answer: 31120
import readFile from '../common/readFile';

// if I were to make this efficient, I'd use a linked list
// since we only care about the top and bottom of the deck

type Deck = number[];
type History = Map<string, boolean>;

enum Player {
  ONE = '1',
  TWO = '2',
}

interface Input {
  deck1: Deck;
  deck2: Deck;
}

export const solution = (input: Input): number => {
  const deck1 = [...input.deck1];
  const deck2 = [...input.deck2];

  // combat mutates the decks
  const winner = combat(new Map(), deck1, deck2);

  // calculate weighted sum
  const deck = winner === Player.ONE ? deck1 : deck2;
  return deck.reduce((acc, card, idx) => acc + card * (deck.length - idx), 0);
};

// casts game state to string to use as key in history Map
const id = (deck1: Deck, deck2: Deck) => `${deck1.join('.')},${deck2.join('.')}`;

// recursive function
const combat = (history: History, deck1: Deck, deck2: Deck): Player => {
  // keep playing till a player runs out of cards
  // (or if cycle is observed, in which case player 1 wins)
  while (deck1.length > 0 && deck2.length > 0) {
    // draw cards
    const card1 = deck1.shift() as number;
    const card2 = deck2.shift() as number;

    // consult history to check for cycle
    const roundId = id(deck1, deck2);
    if (history.get(roundId)) return Player.ONE;
    history.set(roundId, true);

    if (deck1.length >= card1 && deck2.length >= card2) {
      // run a recursive game to determine round winner

      const winner = combat(new Map(), deck1.slice(0, card1), deck2.slice(0, card2));
      if (winner === Player.ONE) deck1.push(card1, card2);
      else if (winner === Player.TWO) deck2.push(card2, card1);
    } else {
      // round winner is player with higher card

      if (card1 > card2) deck1.push(card1, card2);
      else if (card2 > card1) deck2.push(card2, card1);
      else throw new Error('Encountered matching cards, no rule for draw');
    }
  }

  return deck1.length === 0 ? Player.TWO : Player.ONE;
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
