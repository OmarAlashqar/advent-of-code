import scalarTest from '../common/scalarTest';
import {solution as solution1} from './part-1';
import {solution as solution2} from './part-2';

scalarTest('Part 1 - Test 1', solution1([1, 3, 2], 2020), 1);
scalarTest('Part 1 - Test 2', solution1([2, 1, 3], 2020), 10);
scalarTest('Part 1 - Test 3', solution1([1, 2, 3], 2020), 27);
scalarTest('Part 1 - Test 4', solution1([2, 3, 1], 2020), 78);
scalarTest('Part 1 - Test 5', solution1([3, 2, 1], 2020), 438);
scalarTest('Part 1 - Test 6', solution1([3, 1, 2], 2020), 1836);
scalarTest('Part 1 - Test 7', solution1([0, 3, 6], 10), 0);

scalarTest('Part 2 - Test 1', solution2([0, 3, 6], 30000000), 175594);
scalarTest('Part 2 - Test 2', solution2([1, 3, 2], 30000000), 2578);
scalarTest('Part 2 - Test 3', solution2([2, 1, 3], 30000000), 3544142);
scalarTest('Part 2 - Test 4', solution2([1, 2, 3], 30000000), 261214);
scalarTest('Part 2 - Test 5', solution2([2, 3, 1], 30000000), 6895259);
scalarTest('Part 2 - Test 6', solution2([3, 2, 1], 30000000), 18);
scalarTest('Part 2 - Test 7', solution2([3, 1, 2], 30000000), 362);
