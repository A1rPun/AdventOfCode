(function() {
  class Vector {
    constructor(x, y, length, direction) {
      this.x = x;
      this.y = y;
      this.length = length;
      this.direction = direction;
    }
  }

  const centralPort = new Vector(0, 0);
  const directions = {
    U: (cur, n) => new Vector(cur.x, cur.y - n, n, 'U'),
    R: (cur, n) => new Vector(cur.x + n, cur.y, n, 'R'),
    D: (cur, n) => new Vector(cur.x, cur.y + n, n, 'D'),
    L: (cur, n) => new Vector(cur.x - n, cur.y, n, 'L'),
  };

  function manhatten(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  function day_3(puzzle) {
    const getVectors = (acc, cur) => {
      const direction = cur[0];
      const length = parseInt(cur.slice(1), 10);
      const vector = directions[direction](acc[acc.length - 1], length);
      acc.push(vector);
      return acc;
    };
    const wires = puzzle
      .split('\n')
      .filter(x => x)
      .map(x => x.split(',').reduce(getVectors, [centralPort]));

    const grid = wires.reduce(
      (acc, wire) => {
        wire.reduce((prev, cur) => {
          let vector = new Vector(prev.x, prev.y, 1, cur.direction);
          let len = cur.length;
          for (let i = 0; i < len; i++) {
            const key = `${vector.x}_${vector.y}`;
            if (!acc[key]) acc[key] = 1;
            else acc[key]++;
            vector = directions[vector.direction](vector, 1);
          }
          return cur;
        });
        return acc;
      },
      { '0_0': 1 - wires.length }
    );

    const intersections = Object.entries(grid).reduce((acc, [key, times]) => {
      if (times > 1) {
        const [x, y] = key.split('_').map(December.toInt);
        acc.push(new Vector(x, y));
      }
      return acc;
    }, []);

    const answer1 = intersections
      .map(x => manhatten(centralPort, x))
      .sort((a, b) => a - b);
    const answer2 = 1;
    return Promise.resolve([answer1, answer2]);
  }

  December.addDay({
    day: 3,
    year: 2019,
    title: 'Crossed Wires',
    questions: [
      'What is the Manhattan distance from the central port to the closest intersection?',
    ],
    answer: day_3,
    example: () =>
      'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83',
    solutions: [],
  });
})();
