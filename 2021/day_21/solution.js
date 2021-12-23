import { getNumbers } from '../../js/december.js';

export default {
  title: 'Dirac Dice',
  questions: [
    'What do you get if you multiply the score of the losing player by the number of times the die was rolled during the game?',
    '',
  ],
  answer1: (puzzle) => {
    const [,p1,,p2] = getNumbers(puzzle);
    const scores = [0, 0];
    const currentPlayer = 0;
    const max = 1000;
    const rolls = 0;

    while (scores.every(x => x < max)) {

      rolls++;
    }

    return rolls * Math.min(...scores);
  },
  answer2: (puzzle) => {},
  example: [
    {
      input: `Player 1 starting position: 4
Player 2 starting position: 8`,
      solutions: [],
    },
  ],
  input: `Player 1 starting position: 7
Player 2 starting position: 2`,
  solutions: [],
};
