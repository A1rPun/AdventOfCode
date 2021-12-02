import December from '../../js/december.js';

class Layout {
  constructor(grid) {
    this.grid = grid;
    this.rating = this.calcBiodiversityRating();
  }

  calcBiodiversityRating() {
    // Comparable: return parseInt(this.grid.slice().reverse().join(''), 2);
    return this.grid.reduce((acc, bug, i) => (bug ? 2 ** i + acc : acc), 0);
  }
}

function createGrid(layout) {
  return layout.split('').reduce((acc, cur) => {
    if (cur !== '\n') {
      acc.push(Number(cur === '#'));
    }
    return acc;
  }, []);
}

function countNeighbors(grid, index) {
  const stride = 5;
  const y = Math.floor(index / stride);
  const hasLeft = Math.floor((index - 1) / stride) === y;
  const hasRight = Math.floor((index + 1) / stride) === y;
  return (
    (grid[index - stride] || 0) + // y - 1
    (grid[index + stride] || 0) + // y + 1
    (hasLeft ? grid[index - 1] : 0) + // x - 1
    (hasRight ? grid[index + 1] : 0) // x + 1
  );
}

function fittestBug(bug, neighbors) {
  if (bug && neighbors !== 1) return 0;
  else if (!bug && (neighbors === 1 || neighbors === 2)) return 1;
  else return bug;
}

function nextState(grid) {
  return grid.map((bug, i) => fittestBug(bug, countNeighbors(grid, i)));
}

function gameOfBugs(puzzle) {
  const states = new Map();
  let grid = createGrid(puzzle);
  let matchedState;

  while (true) {
    const layout = new Layout(grid);

    if (states.has(layout.rating)) {
      matchedState = layout;
      break;
    }
    states.set(layout.rating, layout);
    grid = nextState(grid);
  }
  December.log(matchedState.grid.join(''));
  return matchedState.rating;
}

function gameOfBugsRecursive(puzzle, iter) {
  let grid = createGrid(puzzle);
  while (--iter) {
    // TODO: lulzify
    grid = nextState(grid);
  }
  December.log(grid.join(''));
  return grid.reduce(December.sum);
}

export default {
  day: 24,
  year: 2019,
  title: 'Planet of Discord',
  questions: [
    'What is the biodiversity rating for the first layout that appears twice?',
    'Starting with your scan, how many bugs are present after 200 minutes?',
  ],
  answer1: ([puzzle]) => gameOfBugs(puzzle),
  answer2: ([puzzle, iter]) => gameOfBugsRecursive(puzzle, iter),
  input: [
    `.....
...#.
.#..#
.#.#.
...##`,
    200,
  ],
  example: [
    {
      input: [
        `....#
#..#.
#..##
..#..
#....`,
        10,
      ],
      solutions: [2129920, 99],
    },
  ],
  solutions: [18370591],
};
