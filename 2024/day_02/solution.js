import { toInt } from '../../js/december.js';

function parseWithFilter(puzzle, filter) {
  return puzzle
      .split('\n')
      .map(x => x.split(' ').map(toInt))
      .filter(filter)
      .length;
}

function isSafeLevel(asc, previousLevel, level) {
  return ((asc && previousLevel < level)
      || (!asc && previousLevel > level))
    && Math.abs(previousLevel - level) <= 3;
}

function isSafeReport(report) {
  const asc = report[0] < report[1];
  let isSafe = true;

  for (let i = 1; i < report.length; i++) {
    const previousLevel = report[i - 1];
    const level = report[i];

    if (!isSafeLevel(asc, previousLevel, level)) {
      isSafe = false;
      break;
    }
  }
  return isSafe;
}

function isDampenedSafeReport(report) {
  let asc = report[0] < report[1];
  let isSafe = true;
  let failed = 0;
  let previousLevel = report[0];

  for (let i = 1; i < report.length; i++) {
    const level = report[i];

    if (isSafeLevel(asc, previousLevel, level)) {
      previousLevel = level;
    } else {
      failed++;
    }

    if (failed > 1) {
      isSafe = false;
      break;
    }
  }
  return isSafe;
}

export default {
  title: 'Red-Nosed Reports',
  questions: [
    'How many reports are safe?',
    'How many reports are now safe?',
  ],
  answer1: (puzzle) => parseWithFilter(puzzle, isSafeReport),
  answer2: (puzzle) => parseWithFilter(puzzle, (report) =>
    isDampenedSafeReport(report)
    || isSafeReport(report.slice(1))
    || isSafeReport([report[0], ...report.slice(2)])
  ),
  example: [
    {
      input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
      solutions: [2, 4],
    },
    {
      input: `4 6 4 3 2
1 6 4 3 2
1 6 1 2 1
1 6 5 1 0
4 6 5 4 3
1 2 3 4 2
1 2 3 4 0
0 2 3 8 1`,
      solutions: [0, 5],
    },
    {
      input: `4 1 5 7 9`,
      solutions: [0, 1],
    },
  ],
  solutions: [516, 561],
};
