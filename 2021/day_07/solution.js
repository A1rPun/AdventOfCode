import { toInt, sum } from '../../js/december.js';

function costFuel(puzzle, fn) {
  const crabs = puzzle.split(',').map(toInt);
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  const fuels = [];

  for (let i = min; i <= max; i++) {
    const total = crabs.map(x => fn(x, i)).reduce(sum);
    fuels.push(total);
  }
  return Math.min(...fuels);
}

function simpleFuel(x, n) {
  return Math.abs(x - n);
}

function betterFuel(x, n) {
  const diff = simpleFuel(x, n);
  return (diff + 1) * (diff / 2);
}

export default {
  title: `The Treachery of Whales`,
  questions: [
    'How much fuel must they spend to align to that position?',
    'How much fuel must they spend to align to that position?'
  ],
  answer1: (puzzle) => costFuel(puzzle, simpleFuel),
  answer2: (puzzle) => costFuel(puzzle, betterFuel),
  example: [
    {
      input: '16,1,2,0,4,2,7,1,2,14',
      solutions: [37, 168],
    },
  ],
  solutions: [347011, 98363777],
};
