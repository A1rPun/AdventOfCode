import { createSquareGrid, toInt } from '../../js/december.js';
import { AStar } from '../../js/astar.js';

export default {
  title: 'Chiton',
  questions: [
    'What is the lowest total risk of any path from the top left to the bottom right?',
    '',
  ],
  answer1: (puzzle) => {
    const check = puzzle.split('\n');
    const grid = createSquareGrid(10, (x, y) => toInt(check[y][x]));

    const aStar = new AStar(grid, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const path = aStar.findPath([0, 0], [9, 9]);

    return path.length;
  },
  // answer2: (puzzle) => {},
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
      solutions: [40],
    },
  ],
  solutions: [],
};
