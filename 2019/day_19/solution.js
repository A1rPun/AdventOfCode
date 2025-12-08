import Vector from '../../js/vector.js';
import IntCode from '../shared/intCode.js';

const checkVector = (memory, x, y) =>
  new IntCode(memory, x, y).run()[0];

function countBeam(memory, stride) {
  const mapSize = stride * stride;
  let result = 0;

  for (let i = 0; i < mapSize; i++) {
    const x = i % stride;
    const y = Math.floor(i / stride);
    result += checkVector(memory, x, y);
  }
  return result;
}

export default {
  title: 'Tractor Beam',
  questions: [
    'How many points are affected by the tractor beam in the 50x50 area closest to the emitter?',
    "What value do you get if you take that point's X coordinate, multiply it by 10000, then add the point's Y coordinate?",
  ],
  answer1: (memory) => countBeam(memory, 50),
  answer2: (memory) => {
    const houseSize = 100 - 1;
    const pos = new Vector(houseSize * 5, houseSize * 10);

    while (true) {
      if (checkVector(memory, pos.x, pos.y)) {
        if (checkVector(memory, pos.x + houseSize, pos.y - houseSize)) {
          break;
        }
        pos.y++;
      } else {
        pos.x++;
      }
    }
    return pos.x * 10000 + (pos.y - houseSize);
  },
  example: [
    {
      input: ``,
      solutions: [],
    },
  ],
  solutions: [162, 13021056],
};
