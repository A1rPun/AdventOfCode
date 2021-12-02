function Cube(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}
Cube.prototype = {
  add: function(cube) {
    this.x += cube.x;
    this.y += cube.y;
    this.z += cube.z;
  },
  distanceTo: function(cube) {
    return Math.max(
      Math.abs(this.x - cube.x),
      Math.abs(this.y - cube.y),
      Math.abs(this.z - cube.z)
    );
  },
};

function day_11(puzzle) {
  const cube_directions = {
    n: new Cube(0, +1, -1),
    s: new Cube(0, -1, +1),
    se: new Cube(+1, -1, 0),
    ne: new Cube(+1, 0, -1),
    nw: new Cube(-1, +1, 0),
    sw: new Cube(-1, 0, +1),
  };
  const home = new Cube(0, 0, 0);
  const end = new Cube(0, 0, 0);
  const directions = puzzle.split(',');
  let furthestDistance = 0;
  for (let i = 0; i < directions.length; i++) {
    const direction = directions[i];
    end.add(cube_directions[direction]);
    const distance = home.distanceTo(end);
    if (distance > furthestDistance) furthestDistance = distance;
  }
  return [home.distanceTo(end), furthestDistance];
}
export default {
  title: 'Hex Ed',
  questions:
    'You have the path the child process took. Starting where he started, you need to determine the fewest number of steps required to reach him.',
  answer: day_11,
  example: ['se,sw,se,sw,sw'],
  exampleSolutions: [3, 3],
  solutions: [764, 1532],
};
