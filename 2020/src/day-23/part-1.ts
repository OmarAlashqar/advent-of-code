// answer: 39564287
import readFile from '../common/readFile';

// circular linked list will shine here :D

interface Node<T> {
  next: Node<T>;
  data: T;
}

class CupsLinkedList {
  head: Node<number>;
  current: Node<number>;
  min: number;
  max: number;

  // for super fast search, just for fun hehehe
  lookup: Map<number, Node<number>>;

  constructor(values: number[]) {
    this.lookup = new Map();
    this.min = Math.min(...values);
    this.max = Math.max(...values);

    // insert values
    let last: Node<number> | null = null;
    for (let i = values.length - 1; i >= 0; i--) {
      this.head = {data: values[i], next: this.head};
      this.lookup.set(values[i], this.head);
      if (!last) last = this.head;
    }

    // make it circular
    if (!last) throw new Error('No labels provided');
    last.next = this.head;

    this.current = this.head;
  }

  getNextThreeValues(): number[] {
    const res = [];
    let ptr = this.current;

    for (let i = 0; i < 3; i++) {
      ptr = ptr.next;
      res.push(ptr.data);
    }

    return res;
  }

  toString(starting = this.head.data, excludeStarting = true): string {
    let startNode = this.lookup.get(starting) as Node<number>;
    let ptr = startNode;
    const list = [];

    if (excludeStarting) ptr = ptr.next;

    do {
      let str = String(ptr.data);
      list.push(str);
      ptr = ptr.next;
    } while (ptr !== startNode);

    return list.join('');
  }
}

export const solution = (input: number[], cycles: number, printFrom: number): string => {
  if (!input.includes(printFrom))
    throw new Error('Label to print from must be one of the values in input list');

  const cups = new CupsLinkedList(input);

  for (let i = 0; i < cycles; i++) {
    let destValue = cups.current.data;
    const pickup = cups.getNextThreeValues();

    // determine destination
    do {
      destValue--;
      if (destValue < cups.min) destValue = cups.max;
    } while (pickup.includes(destValue));

    // get destination cup's node
    const destCup = cups.lookup.get(destValue);
    if (!destCup) throw new Error(`Couldn't find cup with label: ${destValue}`);

    // need to keep a reference of this
    const pickupCupsHead = cups.current.next;

    // picks up the cups and backfills
    cups.current.next = pickupCupsHead.next.next.next;

    // put down cups
    pickupCupsHead.next.next.next = destCup.next;
    destCup.next = pickupCupsHead;

    // move to next cup
    cups.current = cups.current.next;
  }

  return cups.toString(printFrom);
};

if (require.main === module) {
  const raw = readFile(__dirname).split('');
  const input = raw.map(v => Number(v));
  console.log(solution(input, 100, 1));
}
