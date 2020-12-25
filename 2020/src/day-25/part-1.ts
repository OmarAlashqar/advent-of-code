// answer:
import readFile from '../common/readFile';

// brute force ftw :')
// we just need to find one of the loop numbers, not both

// there is no part-2 for this question

const FIRST_VAL = 1;
const FIRST_SUBJ = 7;
const MOD = 20201227;

export const solution = (input: number[]): number => {
  const [key1, key2] = input;
  let [buildKey1, buildKey2] = [FIRST_VAL, FIRST_VAL];

  let loop = 0;
  while (key1 != buildKey1 && key2 != buildKey2) {
    buildKey1 = (buildKey1 * FIRST_SUBJ) % MOD;
    buildKey2 = (buildKey2 * FIRST_SUBJ) % MOD;
    loop++;
  }

  const otherSubj = buildKey1 === key1 ? key2 : key1;
  let encKey = FIRST_VAL;

  for (let i = 0; i < loop; i++) encKey = (encKey * otherSubj) % MOD;

  return encKey;
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  const input = raw.map(v => Number(v));
  console.log(solution(input));
}
