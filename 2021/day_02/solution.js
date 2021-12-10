import { toInt } from '../../js/december.js';

const directions = {
  down: 'down',
  forward: 'forward',
  up: 'up',
};

const planCourse = ([horizontal, depth], cur) => {
  const [direction, num] = cur.split(' ');
  const X = toInt(num);

  if (direction === directions.forward) {
    horizontal += X;
  } else {
    depth += direction === directions.up ? -X : X;
  }
  return [horizontal, depth];
};

const planActualCourse = ([horizontal, depth, aim], cur) => {
  const [direction, num] = cur.split(' ');
  const X = toInt(num);

  if (direction === directions.forward) {
    horizontal += X;
    depth += aim * X;
  } else {
    aim += direction === directions.up ? -X : X;
  }
  return [horizontal, depth, aim];
};

export default {
  title: 'Dive!',
  questions: [
    'What do you get if you multiply your final horizontal position by your final depth?',
    'What do you get if you multiply your final horizontal position by your final depth?',
  ],
  answer1: (puzzle) => {
    const [horizontal, depth] = puzzle.split('\n').reduce(planCourse, [0, 0]);
    return horizontal * depth;
  },
  answer2: (puzzle) => {
    const [horizontal, depth] = puzzle
      .split('\n')
      .reduce(planActualCourse, [0, 0, 0]);
    return horizontal * depth;
  },
  example: [
    {
      input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
      solutions: [150, 900],
    },
  ],
  solutions: [1855814, 1845455714],
};
