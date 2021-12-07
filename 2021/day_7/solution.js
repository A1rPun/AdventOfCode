import { toInt, sum } from '../../js/december.js';

function costFuel(crabs, n) {
  return crabs.map(x => Math.abs(x - n)).reduce(sum);
}

export default {
  title: `The Treachery of Whale's`,
  questions: [
    'How much fuel must they spend to align to that position?', 
    ''
  ],
  answer1: (puzzle) => {
    const crabs = puzzle.split(',').map(toInt);
    const min = Math.min(...crabs);
    const max = Math.max(...crabs);
    const fuels = [];

    for (let i = min; i < max; i++) {
      fuels.push(costFuel(crabs, i));
    }
    return Math.min(...fuels);
  },
  answer2: (puzzle) => {},
  example: [
    {
      input: '16,1,2,0,4,2,7,1,2,14',
      solutions: [37],
    },
  ],
  solutions: [],
};
