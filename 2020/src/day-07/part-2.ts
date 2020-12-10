// answer: 14177
import readFile from '../common/readFile';

// Graph represented map of nodes -> edges
interface Graph {
  // parent -> child -> number of bags
  [parent: string]: {[child: string]: number};
}

const parseRules = (rules: string[]): Graph => {
  return rules.reduce((acc, rule) => {
    const [_, source] = rule.match(/^([a-z ]+) bags/) || [];
    const targets = rule.match(/\d [a-z ]+ bags?/g) || [];

    const edges = targets.reduce((acc, target) => {
      const [_, n, bag] = target.match(/(\d) ([a-z ]+) bags?/) || [];
      return {...acc, [bag]: Number(n)};
    }, {} as {[child: string]: number});

    return {...acc, [source]: edges};
  }, {} as Graph);
};

export const solution = (rules: string[], root: string): number => {
  const graph = parseRules(rules);
  return numBagsInside(graph, root);
};

// recursive, returns how many bags can fit in the root bag
// for performance, this could be memoized
const numBagsInside = (graph: Graph, root: string): number => {
  const children = graph[root];
  if (!children) return 0;

  return Object.entries(children).reduce((acc, [child, n]) => {
    return acc + n * (1 + numBagsInside(graph, child));
  }, 0);
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw, 'shiny gold'));
}
