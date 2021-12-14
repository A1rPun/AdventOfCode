import Vector from '../../js/vector.js';
import { toInt, getNumbers } from '../../js/december.js';

function parse(puzzle) {
  const [positions, lines] = puzzle.split('\n\n');
  const vectors = positions
    .split('\n')
    .map(getNumbers)
    .map(([x, y]) => new Vector(x, y));

  const folds = lines.split('\n').map(x => {
    const [,, op] = x.split(' ');
    const [axis, fold] = op.split('=');
    return [axis, toInt(fold)];
  });

  return [vectors, folds];
}

function fold(vectors, n, axis = 'x') {
  if (axis === 'x')
    vectors
      .filter(v => v.x > n)
      .forEach(v => v.x = n - (v.x - n));
  else
    vectors
      .filter(v => v.y > n)
      .forEach(v => v.y = n - (v.y - n));
}

function prettify(grid, width, height) {
  let pretty = '';
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dot = grid.find(v => v.x === x && v.y === y);
      pretty += dot ? '#' : '.';
    }
    pretty += '\n';
  }
  return pretty;
}

export default {
  title: 'Transparent Origami',
  questions: [
    'How many dots are visible after completing just the first fold instruction on your transparent paper?',
    'What code do you use to activate the infrared thermal imaging camera system?',
  ],
  answer1: (puzzle) => {
    const [vectors, folds] = parse(puzzle);
    const [axis, n] = folds[0];
    fold(vectors, n, axis);

    return [...new Set(vectors.map(v => v.key()))].length;
  },
  answer2: (puzzle) => {
    const [vectors, folds] = parse(puzzle);
    let width = 0;
    let height = 0;

    folds.forEach(([axis, n]) => {
      if (axis === 'x')
        width = n;
      else
        height = n;

      fold(vectors, n, axis);
    });
    return prettify(vectors, width, height);
  },
  example: [
    {
      input: `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`,
      solutions: [17],
    },
  ],
  solutions: [682, 'FAGURZHE'],
};
