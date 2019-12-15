(function() {
  class Asteroid {
    constructor(x, y) {
      this.visible = [];
    }
  }

  function createGrid(input) {
    return input.split('\n').map(x => x.split('').map(y => y === '#'));
  }

  December.addDay({
    day: 10,
    year: 2019,
    title: 'Monitoring Station',
    questions: [
      'Find the best location for a new monitoring station. How many other asteroids can be detected from that location?',
      '',
    ],
    answer1: puzzle => {
      const grid = createGrid(puzzle);
      return Promise.resolve(grid);
    },
    answer2: puzzle => Promise.resolve(),
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
        solutions: [41],
        answer: 1,
      },
    ],
    solutions: [],
  });
})();
