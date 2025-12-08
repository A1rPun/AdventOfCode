import { toInt } from '../../js/december.js';

function calculate(formula, op) {
  return op === '+'
    ? formula.reduce((a, b) => a + b, 0)
    : formula.reduce((a, b) => a * b, 1);
}

export default {
  title: 'Trash Compactor',
  questions: [
    'What is the grand total found by adding together all of the answers to the individual problems?',
    'What is the grand total found by adding together all of the answers to the individual problems?',
  ],
  answer1: (puzzle) => {
    const rows = puzzle.split('\n');
    const ops = rows.slice(-1)[0].match(/([\+|\*])/g);
    const lines = rows.slice(0, -1).map(x => x.match(/(\d+)/g).map(toInt));
    const formulaCount = lines[0].length;
    let answer = 0;

    for (let i = 0; i < formulaCount; i++) {
      const formula = lines.map((x) => x[i]);
      answer += calculate(formula, ops[i]);
    }
    return answer;
  },
  answer2: (puzzle) => {
    const rows = (puzzle + ' '.repeat(3)).split('\n');
    const formulaCount = rows[0].length;
    let answer = 0;
    let formula = [];

    for (let i = formulaCount; i-- > 0;) {
      const digits = rows.slice(0, -1).reduce((acc, cur) => acc + cur[i], '');
      formula.push(+digits.replace(/\s/g, ""));

      const op = rows[rows.length - 1][i].trim();
      if (!op) continue;

      answer += calculate(formula, op);
      formula = [];
      i--;
    }
    return answer;
  },
  example: [
    {
      input: `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `,
      solutions: [4277556, 3263827],
    },
        {
      input: `11 11
2  2 
11 11
1  1 
+  + `,
      solutions: [50, 2444],
    },
  ],
  solutions: [5877594983578, 11159825706149],
};
