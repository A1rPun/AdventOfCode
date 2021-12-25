class SeaCucumber {
  constructor(x, y, east) {
    this.x = x;
    this.y = y;
    this.east = east;
    this.canMove = true;
  }

  moveEast(size) {
    if (!this.canMove || !this.east) return;
    this.x = (this.x + 1) % size;
  }

  moveSouth(size) {
    if (!this.canMove || this.east) return;
    this.y = (this.y + 1) % size;
  }

  checkMoveEast(cucumbers, size) {
    if (!this.east) return;
    const newX = (this.x + 1) % size;
    const neighbour = cucumbers.find(
      (cucumber) => cucumber.x === newX && cucumber.y === this.y
    );
    this.canMove = !neighbour;
  }

  checkMoveSouth(cucumbers, size) {
    if (this.east) return;
    const newY = (this.y + 1) % size;
    const neighbour = cucumbers.find(
      (cucumber) => cucumber.x === this.x && cucumber.y === newY
    );
    this.canMove = !neighbour;
  }
}

export default {
  title: 'Sea Cucumber',
  questions: ['What is the first step on which no sea cucumbers move?', ''],
  answer1: (puzzle) => {
    const lines = puzzle.split('\n');
    const height = lines.length;
    const width = lines[0].length;
    const cucumbers = lines.flatMap((row, y) =>
      row
        .split('')
        .reduce(
          (acc, tile, x) =>
            tile === '.' ? acc : [...acc, new SeaCucumber(x, y, tile === '>')],
          []
        )
    );
    let step = 0;

    while (cucumbers.some((x) => x.canMove)) {
      for (const cucumber of cucumbers) {
        cucumber.checkMoveEast(cucumbers, width);
      }
      for (const cucumber of cucumbers) {
        cucumber.moveEast(width);
      }
      for (const cucumber of cucumbers) {
        cucumber.checkMoveSouth(cucumbers, height);
      }
      for (const cucumber of cucumbers) {
        cucumber.moveSouth(height);
      }
      step++;
    }
    return step;
  },
  answer2: (puzzle) => 50,
  solutions: [351, 50],
  example: [
    {
      input: `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`,
      solutions: [58, 50],
    },
  ],
};
