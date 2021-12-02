import December from '../../js/december.js';

const parse = (puzzle) => puzzle.split('\n').map(December.toInt);
const hasIncrease = (measurement, index, list) => measurement < list[index + 1];
const hasIncreaseSum = (measurement, index, list) =>
  measurement < list[index + 3];

export default {
  title: 'Sonar Sweep',
  questions: [
    'How many measurements are larger than the previous measurement?',
    'How many sums are larger than the previous sum?',
  ],
  answer1: (puzzle) => parse(puzzle).filter(hasIncrease).length,
  answer2: (puzzle) => parse(puzzle).filter(hasIncreaseSum).length,
  example: [
    {
      input: `199
200
208
210
200
207
240
269
260
263`,
      solutions: [7, 5],
    },
  ],
  solutions: [1301, 1346],
};
