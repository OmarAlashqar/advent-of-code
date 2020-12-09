// answer: 265
import readFile from '../common/readFile';

// DAG in the form of an adjacency list
interface Graph {
  // child -> list of parents
  [child: string]: string[];
}

const parseRules = (rules: string[]): Graph => {
  return rules.reduce((acc, rule) => {
    const [_, source] = rule.match(/^([a-z ]+) bags/) || [];
    const targets = rule.match(/\d [a-z ]+ bags?/g) || [];

    for (let target of targets) {
      const [_, bag] = target.match(/\d ([a-z ]+) bags?/) || [];

      if (!(bag in acc)) acc[bag] = [];
      acc[bag].push(source);
    }

    return acc;
  }, {} as Graph);
};

const union = (setA: Set<string>, setB: Set<string>): Set<string> => new Set([...setA, ...setB]);

export const solution = (rules: string[], leaf: string): number => {
  const graph = parseRules(rules);

  let prevSize = 0;
  let ancestors = new Set<string>();
  let currentParents = new Set([leaf]); // seeds process

  // BFS for ancestors until steady-state
  do {
    prevSize = ancestors.size;

    const currentParentKeys = currentParents.keys();
    currentParents = new Set();

    // look for parents of all current parents, going one level higher in ancestry
    for (let parent of currentParentKeys) {
      if (!graph[parent]) continue;
      currentParents = union(currentParents, new Set(graph[parent]));
    }

    // add the parents to the accumulative list of ancestors of the leaf
    ancestors = union(ancestors, currentParents);
  } while (ancestors.size != prevSize);

  return ancestors.size;
};

(async () => {
  const raw = (await readFile(__dirname)).split('\n');
  console.log(solution(raw, 'shiny gold'));
})().catch(console.error);
