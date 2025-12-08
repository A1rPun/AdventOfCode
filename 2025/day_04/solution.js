const roll = '@';
const emptySpace = '.';

function getAccessableRolls(grid) {
  const width = grid[0].length;
  const height = grid.length;
  const rolls = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] !== roll) continue;

      let neighbors = 0;
      if (x !== 0) neighbors += grid[y][x - 1] === roll;
      if (x !== width - 1) neighbors += grid[y][x + 1] === roll;
      if (y !== 0) neighbors += grid[y - 1][x] === roll;
      if (y !== height - 1) neighbors += grid[y + 1][x] === roll;
      if (x !== 0 && y !== 0) neighbors += grid[y - 1][x - 1] === roll;
      if (x !== 0 && y !== height - 1) neighbors += grid[y + 1][x - 1] === roll;
      if (x !== width - 1 && y !== 0) neighbors += grid[y - 1][x + 1] === roll;
      if (x !== width - 1 && y !== height - 1) neighbors += grid[y + 1][x + 1] === roll;

      if (neighbors < 4) rolls.push({ x, y });
    }
  }
  return rolls;
}

export default {
  title: 'Printing Department',
  questions: [
    'How many rolls of paper can be accessed by a forklift?',
    'How many rolls of paper in total can be removed by the Elves and their forklifts?',
  ],
  answer1: (puzzle) => {
    const grid = puzzle.split('\n');
    return getAccessableRolls(grid).length;
  },
  answer2: (puzzle) => {
    const grid = puzzle.split('\n').map(x => [...x]);
    let answer = 0;
    let rolls = [];

    do {
      rolls = getAccessableRolls(grid);
      answer += rolls.length;
      rolls.forEach(({ x, y }) => grid[y][x] = emptySpace);
    } while(rolls.length > 0);

    return answer;
  },
  example: [
    {
      input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
      solutions: [13, 43],
    },
  ],
  solutions: [1493, 9194],
};
