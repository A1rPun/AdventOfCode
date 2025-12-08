import { toInt } from '../../js/december.js';

function getLists(puzzle) {
  return puzzle.split('\n').reduce((acc, cur) => {
    const [l, r] = cur.split('   ').map(toInt);
    acc[0].push(l);
    acc[1].push(r);
    return acc;
  }, [[],[]]);
}

export default {
  title: 'Historian Hysteria',
  questions: [
    'What is the total distance between your lists?',
    'What is their similarity score?',
  ],
  answer1: (puzzle) => {
    let answer = 0;
    const [left, right] = getLists(puzzle);
    left.sort();
    right.sort();
    for (let i = 0; i < left.length; i++) {
      const l = left[i];
      const r = right[i];
      answer += Math.abs(l - r);
    }
    return answer;
  },
  answer2: (puzzle) => {
    let answer = 0;
    const [left, right] = getLists(puzzle);

    for (let i = 0; i < left.length; i++) {
      const l = left[i];
      const times = right.filter(x => x === l).length;
      answer += l * times;
    }
    return answer;
  },
  example: [
    {
      input: `3   4
4   3
2   5
1   3
3   9
3   3`,
      solutions: [11, 31],
    },
  ],
  solutions: [2164381, 20719933],
};
