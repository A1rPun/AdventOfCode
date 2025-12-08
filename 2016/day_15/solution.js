import { getNumbers } from '../../js/december.js';

class Disc {
  constructor(positions, start) {
    this.positions = positions;
    this.start = start;
  }

  canPass(time) {
    return (time + this.start) % this.positions === 0;
  }
}

function checkTime(discs, time) {
  for (var i = 0; i < discs.length; i++) {
    time++;
    if (!discs[i].canPass(time)) return;
  }
  return true;
}

function day_15(puzzle) {
  puzzle = puzzle.split('\n');
  var discs = [];
  for (var i = 0; i < puzzle.length; i++) {
    var nums = getNumbers(puzzle[i]);
    discs.push(new Disc(nums[1], nums[3]));
  }
  discs.push(new Disc(11, 0)); // Answer2

  var answer1 = -1;
  var validTime = false;
  while (!validTime) {
    answer1++;
    validTime = checkTime(discs, answer1);
  }
  return [,answer1];
}

export default {
  title: 'Timing is Everything',
  questions: [
    'What is the first time you can press the button to get a capsule?',
    'With this new disc, what is the first time you can press the button to get another capsule?',
  ],
  answer: day_15,
  example: [
    'Disc #1 has 5 positions; at time=0, it is at position 4.\nDisc #2 has 2 positions; at time=0, it is at position 1.',
  ],
  exampleSolutions: [, 85],
  solutions: [121834, 3208099],
};
