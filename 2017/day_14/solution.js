import Vector from '../../js/vector.js';

function hexToByte(h) {
  return parseInt(h, 16)
    .toString(2)
    .padStart(4, '0');
}

function rowHash(input) {
  return December.knotHash(input)
    .split('')
    .map(hexToByte)
    .join('');
}

function findOpenGroup(grid, char) {
  const size = grid.length;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y][x] === char) {
        return new Vector(x, y);
      }
    }
  }
}

function findRegions(rows) {
  const grid = rows.map((x) => x.split(''));
  let pos;
  let regions = 0;
  while ((pos = findOpenGroup(grid, '1'))) {
    floodFill(grid, pos.x, pos.y, '1', '#');
    regions++;
  }
  return regions;
}

function floodFill(grid, startX, startY, oldVal, newVal) {
  function doFill(x, y) {
    if (grid[y][x] !== oldVal) {
      return;
    }
    grid[y][x] = newVal;
    if (x > 0) {
      // left
      doFill(x - 1, y);
    }
    if (y > 0) {
      // up
      doFill(x, y - 1);
    }
    if (x < size - 1) {
      // right
      doFill(x + 1, y);
    }
    if (y < size - 1) {
      // down
      doFill(x, y + 1);
    }
  }
  const size = grid.length;
  if (oldVal == null) {
    oldVal = grid[y][x];
  }
  doFill(startX, startY);
}

function day_14(puzzle) {
  const rows = December.range(128).map((x) => rowHash(`${puzzle}-${x}`));
  const answer1 = December.count(rows.join('\n'), '1');
  const answer2 = findRegions(rows);
  return [answer1, answer2];
}
export default {
  title: 'Disk Defragmentation',
  questions: [
    'How many squares are used?',
    'How many regions are present given your key string?',
  ],
  answer: day_14,
  input: 'hxtvlmkl',
  example: ['flqrgnkx'],
};
