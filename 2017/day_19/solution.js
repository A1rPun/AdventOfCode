import Vector from '../../js/vector.js';

function day_19(puzzle) {
  const directions = {
    top: 1,
    right: 2,
    bottom: 4,
    left: 8,
  };
  const grid = puzzle.split('\n').map((x) => x.split(''));
  const position = new Vector(grid[0].indexOf('|'), 0);
  let direction = directions.bottom;
  let answer1 = '';
  let answer2 = 0;
  while (true) {
    switch (direction) {
      case directions.top:
        position.y--;
        break;
      case directions.right:
        position.x++;
        break;
      case directions.bottom:
        position.y++;
        break;
      default:
        position.x--;
        break;
    }
    answer2++;
    const tile = grid[position.y][position.x];
    switch (tile) {
      case '+':
        let { x, y } = position;
        if (direction === directions.top || direction === directions.bottom) {
          const rightNeighbor = grid[y][x + 1];
          direction =
            !rightNeighbor || rightNeighbor === '|' || rightNeighbor === ' '
              ? directions.left
              : directions.right;
        } else {
          const bottomNeighbor = grid[y + 1];
          direction =
            !bottomNeighbor ||
            bottomNeighbor[x] === '-' ||
            bottomNeighbor[x] === ' '
              ? directions.top
              : directions.bottom;
        }
        break;
      case '|':
      case '-':
        break;
      case ' ':
        direction = 0;
        break;
      default:
        answer1 += tile;
        break;
    }
    if (!direction) break;
  }
  return [answer1, answer2];
}
export default {
  title: 'A Series of Tubes',
  questions: [
    'What letters will it see if it follows the path?',
    'How many steps does the packet need to go?',
  ],
  answer: day_19,
  example: [
    `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ `,
  ],
  exampleSolutions: ['ABCDEF', 38],
  solutions: ['QPRYCIOLU', 16162],
};
