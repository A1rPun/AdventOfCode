import Vector from '../../js/vector.js';

const tile = {
  empty: 0,
  wall: 1,
  block: 2,
  paddle: 3,
  ball: 4,
};

export default {
  title: 'Care Package',
  questions: [
    'How many block tiles are on the screen when the game exits?',
    'What is your score after the last block is broken?',
  ],
  answer1: (memory) => {
    const blockTiles = new December.IntCode(memory)
      .run()
      .reduce(
        (acc, cur, i) =>
          cur === tile.block && (i + 1) % 3 === 0 ? acc + 1 : acc,
        0
      );
    return blockTiles;
  },
  answer2: (memory) => {
    const computer = new December.IntCode(memory);
    computer.memory[0] = 2; // Play for free

    let ball = new Vector();
    let paddle = new Vector();
    let score = 0;
    let input = 0;

    while (!computer.halted) {
      const [x, y, z] = computer.setInput(input).run(3);

      if (x === -1 && y === 0) {
        score = z;
      } else if (z == tile.paddle) {
        paddle = new Vector(x, y);
      } else if (z == tile.ball) {
        ball = new Vector(x, y);
      }
      input = Math.max(-1, Math.min(ball.x - paddle.x, 1));
    }
    return score;
  },
  example: [
    // {
    //   input: 123456789,
    //   solutions: [],
    //   answer: 1,
    // },
  ],
  solutions: [205, 10292],
};
