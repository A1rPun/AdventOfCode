import Vector from '../../js/vector.js';
import { getNumbers, safeAdd } from '../../js/december.js';

function parse(puzzle) {
  return puzzle.split('\n').map((x) => {
    const [x1, y1, x2, y2] = getNumbers(x);
    return { from: new Vector(x1, y1), to: new Vector(x2, y2) };
  });
}

function drawLines(lines) {
  const result = lines.reduce((acc, v) => {
    const forX = v.from.x === v.to.x ? 0 : v.from.x < v.to.x ? 1 : -1;
    const forY = v.from.y === v.to.y ? 0 : v.from.y < v.to.y ? 1 : -1;
    let x = v.from.x;
    let y = v.from.y;

    while (v.to.x + forX !== x || v.to.y + forY !== y) {
      const key = `${x}_${y}`;
      safeAdd(acc, key);
      x += forX;
      y += forY;
    }
    return acc;
  }, {});
  return Object.values(result).filter((x) => x > 1).length;
}

export default {
  title: 'Hydrothermal Venture',
  questions: [
    'At how many points do at least two lines overlap?',
    'At how many points do at least two lines overlap?',
  ],
  answer1: (puzzle) => {
    const lines = parse(puzzle).filter(
      (v) => v.from.x === v.to.x || v.from.y === v.to.y
    );
    return drawLines(lines);
  },
  answer2: (puzzle) => {
    const lines = parse(puzzle);
    return drawLines(lines);
  },
  example: [
    {
      input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
      solutions: [5, 12],
    },
  ],
  solutions: [6225, 22116],
};
