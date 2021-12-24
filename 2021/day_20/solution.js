import { createSquareGrid } from '../../js/december.js';

const on = '#';

function ENHANCE(img, lookup, times) {
  return createSquareGrid(img.length + 2, (x, y) => {
    const area = [-1, 0, 1]
      .flatMap((i) => [-1, 0, 1].map((j) => [x - 1 + j, y - 1 + i]))
      .map(([x, y]) => img[y]?.[x] ?? (lookup[0] === on && times % 2 ? on : ''))
      .map((x) => (x === on ? 1 : 0))
      .join('');
    return lookup[parseInt(area, 2)];
  });
}

function solve(puzzle, times = 2) {
  const [lookup, image] = puzzle.split('\n\n');
  let img = image.split('\n').map((x) => x.split(''));

  for (let i = 0; i < times; i++) {
    img = ENHANCE(img, lookup, i);
  }
  return img.reduce(
    (acc, y) => acc + y.reduce((acc, x) => acc + (x === on ? 1 : 0), 0),
    0
  );
}

export default {
  title: 'Trench Map',
  questions: ['How many pixels are lit in the resulting image?', ''],
  solutions: [5391, 16383],
  answer1: (puzzle) => solve(puzzle),
  answer2: (puzzle) => solve(puzzle, 50),
  example: [
    {
      input: `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`,
      solutions: [35, 3351],
    },
  ],
};
