import Vector from '../../js/vector.js';

class Asteroid extends Vector {
  constructor(x, y) {
    super(x, y);
    this.visible = [];
    this.angle = 0;
  }
}

const ASTEROID = '#';

function createAsteroidMap(input) {
  return input.split('\n').reduce((acc, line, y) => {
    line.split('').forEach((char, x) => {
      if (char === ASTEROID) acc.push(new Asteroid(x, y));
    });
    return acc;
  }, []);
}

function findVisible(map) {
  map.forEach((asteroid) => {
    const others = map.filter((x) => asteroid !== x);
    asteroid.visible = others.filter((x) => isVisible(others, asteroid, x));
  });
}

function product(a, b) {
  return new Vector(b.x - a.x, b.y - a.y);
}

function isVisible(map, a, b) {
  const productB = product(a, b);

  return !map.filter((asteroid) => {
    if (b === asteroid) return;

    const productX = product(a, asteroid);
    const crossProduct = productX.x * productB.y - productX.y * productB.x;
    // If the asteroid is not on the line between (and beyond) a & b, return falsy
    if (crossProduct !== 0) return;
    // Check if the asteroid is between a & b using coordinates
    return Math.abs(productB.x) >= Math.abs(productB.y)
      ? productB.x > 0
        ? a.x <= asteroid.x && asteroid.x <= b.x
        : b.x <= asteroid.x && asteroid.x <= a.x
      : productB.y > 0
      ? a.y <= asteroid.y && asteroid.y <= b.y
      : b.y <= asteroid.y && asteroid.y <= a.y;
  }).length;
}

export default {
  title: 'Monitoring Station',
  questions: [
    'Find the best location for a new monitoring station. How many other asteroids can be detected from that location?',
    'The Elves are placing bets on which will be the 200th asteroid to be vaporized. Win the bet by determining which asteroid that will be; what do you get if you multiply its X coordinate by 100 and then add its Y coordinate?',
  ],
  answer1: (puzzle) => {
    const map = createAsteroidMap(puzzle);
    findVisible(map);
    const mostDetected = map.reduce(
      (acc, x) => Math.max(acc, x.visible.length),
      0
    );
    return mostDetected;
  },
  answer2: (puzzle) => {
    const map = createAsteroidMap(puzzle);
    findVisible(map);
    const mostDetected = map.reduce(
      (acc, x) => Math.max(acc, x.visible.length),
      0
    );
    const station = map.find((x) => x.visible.length === mostDetected);
    station.visible.forEach((x) => {
      const productX = product(station, x);
      x.angle =
        ((Math.atan2(productX.y, productX.x) * 180) / Math.PI + 450) % 360;
    });

    const exactVaporized = station.visible.sort((a, b) => a.angle - b.angle)[
      200 - 1
    ];
    return exactVaporized.x * 100 + exactVaporized.y;
  },
  example: [
    {
      input: `.#..#
.....
#####
....#
...##`,
      solutions: [8],
      answer: 1,
    },
    {
      input: `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`,
      solutions: [33],
      answer: 1,
    },
    {
      input: `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`,
      solutions: [35],
      answer: 1,
    },
    {
      input: `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`,
      solutions: [41],
      answer: 1,
    },
    {
      input: `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`,
      solutions: [210, 802],
    },
    {
      input: `.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....#...###..
..#.#.....#....##`,
      solutions: [30],
      answer: 1,
    },
  ],
  solutions: [253, 815],
};
