(function() {
  December.addDay({
    day: 3,
    year: 2020,
    title: 'Toboggan Trajectory',
    questions: ['How many trees would you encounter?', ''],
    answer1: puzzle => Promise.resolve(),
    answer2: puzzle => Promise.resolve(),
    example: [
      {
        input: `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
        solutions: [7],
        answer: 1,
      },
    ],
    solutions: [],
  });
})();
