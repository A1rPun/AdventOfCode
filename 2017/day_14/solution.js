import { count, range } from '../../js/december.js';
import Vector from '../../js/vector.js';

function hexToByte(h) {
  return parseInt(h, 16)
    .toString(2)
    .padStart(4, '0');
}

function tieKnots(input, times = 64) {
  let hash = range(256);
  const l = hash.length;
  let hashIndex = 0;
  let skipSize = 0;
  while (times--) {
    for (let i = 0; i < input.length; i++) {
      const knotLength = input[i];
      const toIndex = hashIndex + knotLength;
      const wrapIndex = toIndex > l ? toIndex - l : -1;
      const current = (~wrapIndex
        ? hash.slice(hashIndex, l + 1).concat(hash.slice(0, wrapIndex))
        : hash.slice(hashIndex, toIndex)
      ).reverse();
      hash = ~wrapIndex
        ? current
            .slice(-wrapIndex)
            .concat(hash.slice(wrapIndex, hashIndex))
            .concat(current.slice(0, -wrapIndex))
        : hash
            .slice(0, hashIndex)
            .concat(current)
            .concat(hash.slice(toIndex, l + 1));
      hashIndex = (toIndex + skipSize) % l;
      skipSize++;
    }
  }
  return hash;
}

function dense(hash) {
  let densedHash = [];
  let xorred = hash.reduce(function(prev, curr, i) {
    if (i % 16 === 0) {
      densedHash.push(prev);
      return curr;
    }
    return prev ^ curr;
  });
  densedHash.push(xorred);
  return densedHash;
}

function knotHash(puzzle) {
  const lengths = puzzle
    .split('')
    .map(function(char) {
      return char.charCodeAt(0);
    })
    .concat([17, 31, 73, 47, 23]);
  const densedHash = dense(tieKnots(lengths));
  return densedHash
    .map(function(a) {
      return a.toString(16).padStart(2, '0');
    })
    .join('');
}

function rowHash(input) {
  return knotHash(input)
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
  const rows = range(128).map((x) => rowHash(`${puzzle}-${x}`));
  const answer1 = count(rows.join('\n'), '1');
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
  exampleSolutions: [8108, 1242],
  solutions: [8214, 1093],
};
