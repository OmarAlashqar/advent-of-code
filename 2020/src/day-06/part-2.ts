// answer: 3430
import readFile from '../common/readFile';

// This time it's Set intersection, which is a bit more involved than part 1's union

const intersect = (setA: Set<string>, setB: Set<string>): Set<string> => {
  return new Set([...setA].filter(v => setB.has(v)));
};

export const solution = (groups: string[]): number => {
  return groups.reduce((acc, group): number => {
    const [firstMember, ...restMembers] = group.split('\n');

    const groupIntersection = restMembers.reduce(
      (acc, letters) => intersect(acc, new Set(letters.split(''))),
      new Set(firstMember.split(''))
    );

    return acc + groupIntersection.size;
  }, 0);
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n\n');
  console.log(solution(raw));
}
