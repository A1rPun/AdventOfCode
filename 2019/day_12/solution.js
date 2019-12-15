(function() {
  class Point {
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    add(point) {
      this.x += point.x;
      this.y += point.y;
      this.z += point.z;
    }

    resolve(point) {
      return new Point(
        this.x === point.x ? 0 : this.x < point.x ? 1 : -1,
        this.y === point.y ? 0 : this.y < point.y ? 1 : -1,
        this.z === point.z ? 0 : this.z < point.z ? 1 : -1
      );
    }

    size() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
  }

  class Moon {
    constructor(x, y, z) {
      this.pos = new Point(x, y, z);
      this.vel = new Point();
    }

    applyGravity(moon) {
      this.vel.add(this.pos.resolve(moon.pos));
    }

    applyVelocity() {
      this.pos.add(this.vel);
    }

    getEnergy() {
      return this.pos.size() * this.vel.size();
    }
  }

  function createMoons(positions) {
    return positions.split('\n').map(x => new Moon(...December.getNumbers(x)));
  }

  December.addDay({
    day: 12,
    year: 2019,
    title: 'The N-Body Problem',
    questions: [
      'What is the total energy in the system after simulating the moons given in your scan for 1000 steps?',
      'How many steps does it take to reach the first state that exactly matches a previous state?',
    ],
    answer1: ([positions, iter]) => {
      const moons = createMoons(positions);
      for (let i = 0; i < iter; i++) {
        moons.forEach(moon => {
          moons.forEach(x => {
            if (moon === x) return;
            moon.applyGravity(x);
          });
        });
        moons.forEach(moon => moon.applyVelocity());
      }
      return Promise.resolve(
        moons.reduce((acc, cur) => acc + cur.getEnergy(), 0)
      );
    },
    answer2: ([positions, iter]) => {
      const moons = createMoons(positions);
      // while (true) {}
      return Promise.resolve(match);
    },
    input: [
      `<x=-13, y=14, z=-7>
<x=-18, y=9, z=0>
<x=0, y=-3, z=-3>
<x=-15, y=3, z=-13>`,
      1000,
    ],
    example: [
      {
        input: [
          `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`,
          10,
        ],
        solutions: [179, 2772],
      },
      {
        input: [
          `<x=-8, y=-10, z=0>
      <x=5, y=5, z=10>
      <x=2, y=-7, z=3>
      <x=9, y=-8, z=-3>`,
          100,
        ],
        solutions: [1940, 4686774924],
      },
    ],
    solutions: [7138],
  });
})();
