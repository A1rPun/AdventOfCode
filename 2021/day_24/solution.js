import { toInt } from '../../js/december.js';

const highestDigit = (c) => Math.min(9, 9 - c);
const lowestDigit = (c) => Math.max(1, 1 - c);

function solve(puzzle, getDigit) {
  const lines = puzzle.split('\n');
  const terms = [];

  for (let i = 0; i < lines.length; i += 18) {
    terms.push([4, 5, 15].map((j) => toInt(lines[i + j].split(' ')[2])));
  }

  const previous = [];
  const digits = [];

  for (let i = 0; i < terms.length; i++) {
    const [a, b, c] = terms[i];

    if (a === 1) {
      previous.push([i, c]);
    } else {
      const [prevI, prevC] = previous.pop();
      const complement = prevC + b;
      digits[prevI] = getDigit(complement);
      digits[i] = digits[prevI] + complement;
    }
  }
  return toInt(digits.join(''));
}

export default {
  title: 'Arithmetic Logic Unit',
  questions: [
    'What is the largest model number accepted by MONAD?',
    'What is the smallest model number accepted by MONAD?',
  ],
  answer1: (puzzle) => solve(puzzle, highestDigit),
  answer2: (puzzle) => solve(puzzle, lowestDigit),
  solutions: [98998519596997, 31521119151421],
  //   example: [
  //     {
  //       input: `inp z
  // mul z -1`,
  //       solutions: [1],
  //     },
  //     {
  //       input: `inp z
  // inp x
  // mul z 3
  // eql z x`,
  //       solutions: [1],
  //     },
  //     {
  //       input: `inp w
  // add z w
  // mod z 2
  // div w 2
  // add y w
  // mod y 2
  // div w 2
  // add x w
  // mod x 2
  // div w 2
  // mod w 2`,
  //       solutions: [1],
  //     },
  //   ],
};
