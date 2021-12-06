import { sum } from '../../js/december.js';

function func(lifeTime, time, max = 80) {
  if (time === max) {
    return 1;
  } else if (lifeTime > 0) {
    return func(lifeTime - 1, time + 1, max)
  } else {
    return func(6, time + 1, max) + func(8, time + 1, max);
  }
}

export default {
  title: 'Lanternfish',
  questions: [
    'How many lanternfish would there be after 80 days?',
    'How many lanternfish would there be after 256 days?'
  ],
  answer1: (puzzle) =>  puzzle.split(',').map((x) => func(x, 0, 80)).reduce(sum),
  answer2: (puzzle) => puzzle.split(',').map((x) => func(x, 0, 200)).reduce(sum),
  example: [
    {
      input: '3,4,3,1,2',
      solutions: [5934, 26984457539],
    },
  ],
  solutions: [390011,],
};
