import { createSquareGrid } from '../../js/december.js';

function fuelPower(x, y, serial) {
  const rackId = x + 10;
  const power = hundredDigit((rackId * y + serial) * rackId);
  return power - 5;
}

export const hundredDigit = (n) => Math.floor(n / 100) % 10;

export const largestCell = (serial, squareSize, gridWidth = 300) => {
  const dict = createSquareGrid(gridWidth, (x, y) => fuelPower(x + 1, y + 1, serial));
  const powerLevel = (x, y) => dict[y][x];
  const totalPower = (x, y, size) => {
    let power = powerLevel(x + size, y + size);

    for (let i = 0; i < size; i++) {
      power += powerLevel(x + i, y + size);
      power += powerLevel(x + size, y + i);
    }
    return power;
  };

  let cell = {};
  let largestPower = 0;
  createSquareGrid(gridWidth - (squareSize ?? 0), (x, y) => {
    const maxSize = squareSize ?? Math.min(gridWidth - x, gridWidth - y);
    let power = 0;

    for (let i = 0; i < maxSize; i++) {
      power += totalPower(x, y, i);

      if (power > largestPower) {
        largestPower = power;
        cell = { x: x + 1, y: y + 1, size: i + 1 };
      }
    }
  });
  return cell;
};

export default {
  title: 'Chronal Charge',
  questions: [
    'What is the X,Y coordinate of the top-left fuel cell of the 3x3 square with the largest total power?',
    'What is the X,Y,size identifier of the square with the largest total power?',
  ],
  answer1: (puzzle) => {
    const cell = largestCell(puzzle, 3);
    return `${cell.x},${cell.y}`;
  },
  answer2: (puzzle) => {
    const cell = largestCell(puzzle);
    return `${cell.x},${cell.y},${cell.size}`;
  },
  example: [
    {
      input: 18,
      solutions: ['33,45'],
    },
    {
      input: 42,
      solutions: ['21,61'],
    },
  ],
  input: 8772,
  solutions: ['235,31', '241,65,10'],
};
