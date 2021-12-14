import { count, log, prettify } from '../../js/december.js';
import AStar from '../../js/astar.js';

function getTile(x, y, num) {
  var sum = x * x + 3 * x + 2 * x * y + y + y * y + num;
  var bitCount = count(sum.toString(2), '1');
  return bitCount & 1 ? '#' : '.';
}

function day_13(puzzle) {
  const size = 45;
  var grid = [];
  for (var y = 0; y < size; y++) {
    var row = [];
    for (var x = 0; x < size; x++) row.push(getTile(x, y, puzzle));
    grid.push(row);
  }
  var astar = new AStar(grid, ['.']);
  var path = astar.findPath([1, 1], [31, 39]);

  var answer2 = 1;
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      var length = astar.findPath([1, 1], [x, y]).length - 1;
      if (length > 0 && length <= 50) answer2++;
    }
  }
  log(prettifyGrid(grid, path));
  return [path.length - 1, answer2];
}

function prettifyGrid(grid, path) {
  for (var i = 0; i < path.length; i++)
    grid[path[i][1]][path[i][0]] = i === path.length - 1 ? 'X' : 'O';
  return prettify(grid);
}

export default {
  title: 'A Maze of Twisty Little Cubicles',
  questions: [
    'What is the fewest number of steps required for you to reach 31,39?',
    'How many locations (distinct x,y coordinates, including your starting location) can you reach in at most 50 steps?',
  ],
  answer: day_13,
  input: 1358,
  example: ['10'],
  exampleSolutions: [11,],
  solutions: [96, 141],
};
