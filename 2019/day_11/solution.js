import { prettify, toInt } from '../../js/december.js';
import Vector from '../../js/vector.js';
import IntCode from '../shared/intCode.js';

const directions = {
  north: 1,
  east: 2,
  south: 3,
  west: 4,
};

const colors = {
  black: 0,
  white: 1,
};

class Painter {
  constructor(memory) {
    this.computer = new IntCode(memory);
    this.direction = directions.north;
    this.pos = new Vector();
  }

  turn(turnRight) {
    let direction = turnRight ? this.direction + 1 : this.direction - 1;
    if (direction === 0) direction = directions.west;
    if (direction === 5) direction = directions.north;
    this.direction = direction;
  }

  move() {
    switch (this.direction) {
      case directions.north:
        this.pos.y--;
        break;
      case directions.east:
        this.pos.x++;
        break;
      case directions.south:
        this.pos.y++;
        break;
      case directions.west:
      default:
        this.pos.x--;
        break;
    }
  }
}

function createGrid(memory, grid = {}) {
  const painter = new Painter(memory);

  while (!painter.computer.halted) {
    const key = painter.pos.key();
    const [color, direction] = painter.computer
      .setInput(grid[key] || colors.black)
      .run(2);

    if (color === colors.black || color === colors.white) {
      painter.turn(direction);
      painter.move();
      grid[key] = color;
    }
  }
  return grid;
}

function answer2(memory) {
  const grid = createGrid(memory, {
    [new Vector().key()]: colors.white,
  });

  const width = 43;
  const height = 6;
  const canvas = Array.from(Array(height), () =>
    Array.from(Array(width), () => colors.black)
  );

  Object.entries(grid).forEach(([key, color]) => {
    const [x, y] = key.split('_').map(toInt);
    canvas[y][x] = color;
  });

  const prettified = prettify(canvas)
    .replace(/0/g, '.')
    .replace(/1/g, '#');
  return prettified;
}

export default {
  title: 'Space Police',
  questions: [
    'How many panels does it paint at least once?',
    'After starting the robot on a single white panel instead, what registration identifier does it paint on your hull?',
  ],
  answer1: (memory) => Object.values(createGrid(memory)).length,
  answer2,
  solutions: [
    1686,
    `..##...##..###..###..#..#.####.#..#.#......
.#..#.#..#.#..#.#..#.#.#.....#.#..#.#......
.#....#..#.#..#.#..#.##.....#..#..#.#......
.#.##.####.###..###..#.#...#...#..#.#......
.#..#.#..#.#.#..#....#.#..#....#..#.#......
..###.#..#.#..#.#....#..#.####..##..####...
`,
  ],
};
