import { toInt } from '../../js/december.js';

export default {
  title: 'Cafeteria',
  questions: [
    'How many of the available ingredient IDs are fresh?',
    'How many ingredient IDs are considered to be fresh according to the fresh ingredient ID ranges?',
  ],
  answer1: (puzzle) => {},
  answer2: (puzzle) => {},
  example: [
    {
      input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
      solutions: [3, 14],
    },
  ],
  solutions: [896],
};
