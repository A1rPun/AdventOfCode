const directions = {
  north: 1,
  south: 2,
  west: 3,
  east: 4,
};

const statusCodes = {
  wall: 0,
  requested: 1,
  oxygen: 2,
};

const tiles = {
  empty: ' ',
  droid: 'D',
  walls: '#',
  visited: '.',
};

function answer1(memory) {
  const computer = new December.IntCode(memory);
  const width = 50;
  const height = 50;
  const canvas = Array.from(Array(height), () =>
    Array.from(Array(width), () => tiles.empty)
  );
  let movement = directions.north;
  // while (!computer.halted) {
  //   const [status] = computer.setInput(movement).run(1);
  // }
  return;
}

export default {
  title: 'Oxygen System',
  questions: [
    'What is the fewest number of movement commands required to move the repair droid from its starting position to the location of the oxygen system?',
    '',
  ],
  answer1,
  answer2: (puzzle) => {},
  example: [],
  solutions: [],
};
