import { toInt } from '../../js/december.js';

function getBasinSize(area, x, y, checked = {}) {
  let size = 1;
  const self = area[y][x];

  if (self === 9 || checked[`${x}_${y}`]) return 0;

  checked[`${x}_${y}`] = 1;

  if (area[y]?.[x + 1] && self < area[y][x + 1]) {
    size += getBasinSize(area, x + 1, y, checked);
  }

  if (area[y]?.[x - 1] && self < area[y][x - 1]) {
    size += getBasinSize(area, x - 1, y, checked);
  }

  if (area[y + 1]?.[x] && self < area[y + 1][x]) {
    size += getBasinSize(area, x, y + 1, checked);
  }

  if (area[y - 1]?.[x] && self < area[y - 1][x]) {
    size += getBasinSize(area, x, y - 1, checked);
  }

  return size;
}

export default {
  title: 'Smoke Basin',
  questions: [
    'What is the sum of the risk levels of all low points on your heightmap?',
    'What do you get if you multiply together the sizes of the three largest basins?',
  ],
  answer1: (puzzle) =>
    puzzle
      .split('\n')
      .reduce(
        (acc, cur, y, arr) => [
          ...acc,
          ...cur
            .split('')
            .filter(
              (height, x) =>
                (!arr[y]?.[x + 1] || height < arr[y][x + 1]) &&
                (!arr[y]?.[x - 1] || height < arr[y][x - 1]) &&
                (!arr[y + 1]?.[x] || height < arr[y + 1][x]) &&
                (!arr[y - 1]?.[x] || height < arr[y - 1][x])
            ),
        ],
        []
      )
      .reduce((acc, cur) => acc + toInt(cur) + 1, 0),
  answer2: (puzzle) => {
    const area = puzzle.split('\n').map((row, y) => row.split('').map(toInt));
    const basins = area.map((row, y) =>
      row.map((_, x) => getBasinSize(area, x, y))
    );
    return basins
      .flatMap((row) => row)
      .sort((a, b) => a < b)
      .slice(0, 3)
      .reduce((a, b) => a * b);
  },
  example: [
    {
      input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
      solutions: [15, 1134],
    },
  ],
  solutions: [530, 1019494],
};
