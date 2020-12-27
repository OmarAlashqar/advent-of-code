import {solution as solution1} from './part-1';
import {solution as solution2} from './part-2';
import scalarTest from '../common/scalarTest';

scalarTest('Part 1 - Test 1', solution1(['2 * 3 + (4 * 5)']), 26);
scalarTest('Part 1 - Test 2', solution1(['5 + (8 * 3 + 9 + 3 * 4 * 3)']), 437);
scalarTest('Part 1 - Test 3', solution1(['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))']), 12240);
scalarTest('Part 1 - Test 4', solution1(['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2']), 13632);

scalarTest('Part 2 - Test 1', solution2(['2 * 3 + (4 * 5)']), 46);
scalarTest('Part 2 - Test 2', solution2(['5 + (8 * 3 + 9 + 3 * 4 * 3)']), 1445);
scalarTest('Part 2 - Test 3', solution2(['5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))']), 669060);
scalarTest('Part 2 - Test 4', solution2(['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2']), 23340);
