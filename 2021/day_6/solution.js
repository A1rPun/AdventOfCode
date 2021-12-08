import { toInt, sum } from '../../js/december.js';

function countFish(fishes, max) {
  const days = Array(9).fill(0);
  fishes.forEach((fish) => days[fish]++);

  for (; max--; ) {
    days.push(days.shift());
    days[6] += days[8];
  }
  return days.reduce(sum);
}

function parse(puzzle) {
  return puzzle.split(',').map(toInt);
}

export default {
  title: 'Lanternfish',
  questions: [
    'How many lanternfish would there be after 80 days?',
    'How many lanternfish would there be after 256 days?',
  ],
  answer1: (puzzle) => countFish(parse(puzzle), 80),
  answer2: (puzzle) => countFish(parse(puzzle), 256),
  example: [
    {
      input: '3,4,3,1,2',
      solutions: [5934, 26984457539],
    },
    {
      input: '1,2,3,4,5',
      solutions: [5730, 26135466306],
    },
    {
      input: '1',
      solutions: [1401, 6206821033],
    },
  ],
  solutions: [390011, 1746710169834],
};
