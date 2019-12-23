(function() {
  class Moon {
    constructor(x, y, z) {
      this.pos = new Vector(x, y, z);
      this.vel = new Vector();
      this.initialPosition = new Vector(x, y, z);
    }

    applyGravity(moon) {
      this.vel.add(
        new Vector(
          this.pos.x === moon.pos.x ? 0 : this.pos.x < moon.pos.x ? 1 : -1,
          this.pos.y === moon.pos.y ? 0 : this.pos.y < moon.pos.y ? 1 : -1,
          this.pos.z === moon.pos.z ? 0 : this.pos.z < moon.pos.z ? 1 : -1
        )
      );
    }

    applyVelocity() {
      this.pos.add(this.vel);
    }

    getEnergy() {
      return this.pos.size() * this.vel.size();
    }

    atInitialAxis(axis) {
      return (
        this.vel[axis] === 0 && this.pos[axis] === this.initialPosition[axis]
      );
    }
  }

  class SolarSystem {
    constructor(positions) {
      this.moons = positions
        .split('\n')
        .map(x => new Moon(...December.getNumbers(x)));
    }

    tick() {
      this.moons.forEach(moon => {
        this.moons.forEach(x => {
          if (moon === x) return;
          moon.applyGravity(x);
        });
      });
      this.moons.forEach(moon => moon.applyVelocity());
    }

    atInitialAxis(axis) {
      return this.moons.every(moon => moon.atInitialAxis(axis));
    }
  }

  function greatestCommonDivider(a, b) {
    return !b ? a : greatestCommonDivider(b, a % b);
  }

  function leastCommonMultiple(a, b) {
    return (a * b) / greatestCommonDivider(a, b);
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
      const solarSystem = new SolarSystem(positions);

      for (let i = 0; i < iter; i++) {
        solarSystem.tick();
      }
      return Promise.resolve(
        solarSystem.moons.reduce((acc, cur) => acc + cur.getEnergy(), 0)
      );
    },
    answer2: ([positions]) => {
      const solarSystem = new SolarSystem(positions);
      const dimensions = ['x', 'y', 'z'].map(name => ({ name }));
      let i = 0;

      while (!dimensions.every(x => x.length)) {
        solarSystem.tick();
        i++;
        dimensions.forEach(dimension => {
          if (!dimension.length && solarSystem.atInitialAxis(dimension.name))
            dimension.length = i;
        });
      }
      return Promise.resolve(
        dimensions
          .map(x => x.length)
          .reduce((a, b) => leastCommonMultiple(a, b))
      );
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
    solutions: [7138, 572087463375796],
  });
})();
