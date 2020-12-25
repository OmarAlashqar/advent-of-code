import {solution as solution2} from './part-2';
import scalarTest from '../common/scalarTest';

scalarTest('Part 2 - Test 1', solution2(['17', 'x', '13', '19']), 3417);
scalarTest('Part 2 - Test 2', solution2(['67', '7', '59', '61']), 754018);
scalarTest('Part 2 - Test 3', solution2(['67', 'x', '7', '59', '61']), 779210);
scalarTest('Part 2 - Test 4', solution2(['67', '7', 'x', '59', '61']), 1261476);
scalarTest('Part 2 - Test 5', solution2(['1789', '37', '47', '1889']), 1202161486);
