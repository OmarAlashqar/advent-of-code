// answer: 11004703763391
import readFile from '../common/readFile';

// :~: H Y P E :~:   love me some formal language concepts :^)
// time to roll a narrow expression lexer, parser, and evaluator all in one file

// Used the Shunting Yard algorithm (to produce Reverse Polish Notation) with:
// - no precedence
// - left associativity

export type PrecedenceMap = {[op: string]: number};

const PRECEDENCE: PrecedenceMap = {'+': 0, '*': 0};

// love me a utility
const peek = <T>(arr: T[]): T => arr[arr.length - 1];

const parseToRPN = (expression: string, precedence: PrecedenceMap): string[] => {
  const operators: string[] = [];
  const output: string[] = [];

  // iterate over symbols
  for (let ch of expression) {
    // push to stack if its a number
    if (!isNaN(ch as any)) {
      output.push(ch);
    }

    // push previous operators to stack if they're lower (or equal - making this left associative) precedence
    else if (ch === '+' || ch === '*') {
      while (operators.length && precedence[peek(operators)] >= precedence[ch]) {
        output.push(operators.pop() as string);
      }

      operators.push(ch);
    }

    // push to operands - this will be matched later
    else if (ch === '(') {
      operators.push(ch);
    }

    // push previous operators until bracket is matched
    else if (ch === ')') {
      while (operators.length && peek(operators) !== '(') {
        output.push(operators.pop() as string);
      }

      operators.pop();
    }

    // good ole' error checking
    else throw new Error(`Encountered unknown character: ${ch}`);
  }

  // pop out any left-over operations
  while (operators.length) output.push(operators.pop() as string);

  return output;
};

const evaluate = (rpn: string[]): number => {
  const operands: number[] = [];

  for (let ch of rpn) {
    // push numbers to operands
    if (!isNaN(ch as any)) {
      operands.push(Number(ch));
    }

    // all our operators are binary, so pop two and apply the operation
    else if (ch === '+' || ch === '*') {
      const [op1, op2] = [operands.pop() as number, operands.pop() as number];

      if (isNaN(op1) || isNaN(op2)) throw new Error(`Something's off about this!`);

      // gonna hard code this, but these could be defined as functions
      // in the precedence map (making it an operators map)
      if (ch === '+') operands.push(op1 + op2);
      else if (ch === '*') operands.push(op1 * op2);
    }

    // good ole' error checking
    else throw new Error(`Encountered unknown operator: ${ch}`);
  }

  return operands[0];
};

const solve = (expr: string, precedence: PrecedenceMap): number => {
  // all hail the glorious :lexer:
  const expression = expr.replace(/ /g, '');

  // here comes the renowned :parser:
  const rpn = parseToRPN(expression, precedence);

  // the :evaluator: for the grand finale!
  return evaluate(rpn);
};

export const solution = (input: string[], precedence = PRECEDENCE): number => {
  return input.reduce((acc, expr) => acc + solve(expr, precedence), 0);
};

if (require.main === module) {
  const raw = readFile(__dirname).split('\n');
  console.log(solution(raw));
}
