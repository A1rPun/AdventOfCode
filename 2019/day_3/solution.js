import Astar from '../../js/astar.js';
import Vector from '../../js/vector.js';

class Wire {
  constructor(x, y, length, direction) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.direction = direction;
  }
}

const centralPort = new Wire(0, 0);
const directions = {
  U: (cur, n) => new Wire(cur.x, cur.y - n, n, 'U'),
  R: (cur, n) => new Wire(cur.x + n, cur.y, n, 'R'),
  D: (cur, n) => new Wire(cur.x, cur.y + n, n, 'D'),
  L: (cur, n) => new Wire(cur.x - n, cur.y, n, 'L'),
};

function day_3(puzzle) {
  const getWires = (acc, cur) => {
    const direction = cur[0];
    const length = parseInt(cur.slice(1), 10);
    const vector = directions[direction](acc[acc.length - 1], length);
    acc.push(vector);
    return acc;
  };
  const wires = puzzle
    .split('\n')
    .map(x => x.split(',').reduce(getWires, [centralPort]));

  const grid = wires.reduce(
    (acc, wire, index) => {
      let wireLength = 0;
      wire.reduce((prev, cur) => {
        let vector = new Wire(prev.x, prev.y, 1, cur.direction);
        let len = cur.length;
        for (let i = 0; i < len; i++) {
          const key = vector.key();
          if (!acc[key]) acc[key] = {};
          if (!acc[key][index]) {
            acc[key][index] = { times: 1, length: wireLength };
          } else {
            acc[key][index].times++;
          }
          vector = directions[vector.direction](vector, 1);
          wireLength++;
        }
        return cur;
      });
      return acc;
    },
    { [new Vector().key()]: 1 - wires.length }
  );

  const intersections = Object.entries(grid).reduce((acc, [key, point]) => {
    if (point[0] && point[1] && point[0].times >= 1 && point[1].times >= 1) {
      const [x, y] = key.split('_').map(December.toInt);
      acc.push({ x, y, steps: point[0].length + point[1].length });
    }
    return acc;
  }, []);

  const answer1 = intersections
    .map(x => AStar.ManhattanDistance(centralPort, x))
    .sort((a, b) => a - b);
  const answer2 = intersections.sort((a, b) => a.steps - b.steps);
  return [answer1, answer2];
}

export default {
  day: 3,
  year: 2019,
  title: 'Crossed Wires',
  questions: [
    'What is the Manhattan distance from the central port to the closest intersection?',
    'What is the fewest combined steps the wires must take to reach an intersection?',
  ],
  answer: day_3,
  example: ['R8,U5,L5,D3\nU7,R6,D4,L4'],
  solutions: [1264, 37390],
};
