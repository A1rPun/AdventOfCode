import { getNumbers } from '../../js/december.js';
import Vector from '../../js/vector.js';

class Probe {
  constructor(velX = 0, velY = 0) {
    this.pos = new Vector();
    this.velocity = new Vector(velX, velY);
    this.positions = [];
  }

  move() {
    this.pos.add(this.velocity);
    this.velocity.y--;

    if (this.velocity.x) {
      this.velocity.x += this.velocity.x > 0 ? -1 : 1;
    }

    this.positions.push({ ...this.pos });
  }
}

function highestY(startX, endX, endY, startY, x, y) {
  const probe = new Probe(x, y);

  while (probe.pos.x < endX && probe.pos.y > endY) {
    probe.move();

    if (
      probe.pos.x <= endX &&
      probe.pos.y >= endY &&
      probe.pos.x >= startX &&
      probe.pos.y <= startY
    ) {
      return Math.max(...probe.positions.map((pos) => pos.y));
    }
  }
}

export default {
  title: 'Trick Shot',
  questions: [
    'What is the highest y position it reaches on this trajectory?',
    'How many distinct initial velocity values cause the probe to be within the target area after any step?',
  ],
  answer1: (puzzle) => {
    const [startX, endX, endY, startY] = getNumbers(puzzle);
    let highest = 0;
    const range = 200;

    for (let y = 1; y < range; y++) {
      for (let x = 1; x < range; x++) {
        const yval = highestY(startX, endX, endY, startY, x, y);
        if (highest < yval) highest = yval;
      }
    }
    return highest;
  },
  answer2: (puzzle) => {
    const [startX, endX, endY, startY] = getNumbers(puzzle);
    let count = 0;
    const range = 200;

    for (let y = -range; y < range; y++) {
      for (let x = -range; x < range; x++) {
        const yval = highestY(startX, endX, endY, startY, x, y);
        if (yval !== undefined) count++;
      }
    }
    return count;
  },
  example: [
    {
      input: `target area: x=20..30, y=-10..-5`,
      solutions: [45, 112],
    },
  ],
  input: `target area: x=102..157, y=-146..-90`,
  solutions: [10585, 5247],
};
