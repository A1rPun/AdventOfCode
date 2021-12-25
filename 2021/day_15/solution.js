import { createSquareGrid, toInt, log } from '../../js/december.js';
import { AStarWeight } from './astar-weight.js';

function getPath(puzzle) {
  const grid = createSquareGrid(puzzle.length, (x, y) => toInt(puzzle[y][x]));

  const aStar = new AStarWeight(grid, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  return aStar.findPath([0, 0], [puzzle.length - 1, puzzle.length - 1]);
}

function expandRow(row, n) {
  return row
    .split('')
    .map((x) => Number(x) + n)
    .map((x) => (x < 10 ? x : (x % 10) + 1))
    .join('');
}

function expandGrid(grid) {
  return [
    [0, 1, 2, 3, 4],
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
  ].flatMap((row) =>
    grid.map((gridRow) =>
      row.reduce((acc, x) => acc + expandRow(gridRow, x), '')
    )
  );
}

function getRisk(grid, path, first) {
  return path.reduce((acc, [x, y]) => acc + toInt(grid[y][x]), -toInt(first));
}

export default {
  title: 'Chiton',
  questions: [
    'What is the lowest total risk of any path from the top left to the bottom right?',
    'What is the lowest total risk of any path from the top left to the bottom right?',
  ],
  answer1: (puzzle) => {
    const grid = puzzle.split('\n');
    const path = getPath(grid);
    log(prettify(grid, path));
    return getRisk(grid, path, puzzle[0]);
  },
  answer2: (puzzle) => {
    const grid = expandGrid(puzzle.split('\n'));
    const path = getPath(grid);
    return getRisk(grid, path, puzzle[0]);
  },
  solutions: [508, 2872],
  tries: [['607 too high', '512 too high']],
  example: [
    {
      input: `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`,
      solutions: [40, 315],
    },
    {
      input: `1111111111
1999999991
1999999991
1999999991
1999999991
1999999991
1999999991
1999999991
1999999991
2111111111`,
      solutions: [18],
    },
    {
      input: `1111111112
1999999991
1999999991
1999999991
1999999991
1999999991
1999999991
1999999991
1999999991
1111111111`,
      solutions: [18],
    },
    {
      input: `1234567899
2123456789
3212345678
4321234567
5432123456
6543212345
7654321234
8765432123
9876543212
9987654321`,
      solutions: [27],
    },
  ],
};

function prettify(grid, path) {
  let result = '';
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const isPath = path.find(([xx, yy]) => xx === x && yy === y);
      result += isPath
        ? `${String.fromCodePoint(8320 + toInt(grid[y][x]))}`
        : `${grid[y][x]}`;
    }
    result += '\n';
  }
  return result;
}
