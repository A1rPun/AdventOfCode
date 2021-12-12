import { toInt } from '../../js/december.js';

function parse(puzzle) {
  return puzzle.split('\n').map((row) => row.split('').map(toInt));
}

function flashOctopuses(octopuses) {
  let totalFlashCount = 0;

  for (let y = 0; y < octopuses.length; y++) {
    for (let x = 0; x < octopuses[y].length; x++) {
      octopuses[y][x]++;
    }
  }
  for (let y = 0; y < octopuses.length; y++) {
    for (let x = 0; x < octopuses[y].length; x++) {
      totalFlashCount += flashOctopus(octopuses, x, y, 0);
    }
  }
  return totalFlashCount;
}

function flashOctopus(arr, x, y, extra = 1) {
  const energy = arr[y][x] + extra;
  const willFlash = energy > 9;
  arr[y][x] = willFlash ? 0 : energy;
  return willFlash ? flashNeighbours(arr, x, y) + 1 : 0;
}

function flashNeighbours(arr, x, y) {
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
    [x + 1, y + 1],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x - 1, y - 1],
  ].reduce(
    (acc, [xx, yy]) => (arr[yy]?.[xx] ? acc + flashOctopus(arr, xx, yy) : acc),
    0
  );
}

export default {
  title: 'Dumbo Octopus',
  questions: ['How many total flashes are there after 100 steps?', ''],
  answer1: (puzzle) => {
    let octopuses = parse(puzzle);
    let totalFlashCount = 0;

    for (let i = 0; i < 100; i++) {
      totalFlashCount += flashOctopuses(octopuses);
    }
    return totalFlashCount;
  },
  answer2: (puzzle) => {
    let octopuses = parse(puzzle);
    let totalFlashCount = 0;
    let step = 0;

    while (!octopuses.every((row) => row.every((octopus) => !octopus))) {
      totalFlashCount += flashOctopuses(octopuses);
      step++;
    }
    return step;
  },
  example: [
    {
      input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`,
      solutions: [1656, 195],
    },
  ],
  solutions: [1694, 346],
};
