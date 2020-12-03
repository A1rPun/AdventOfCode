(function() {
  const tree = '#';

  function findTrees(map, trajectory) {
    const currentPos = new Vector();
    const slopeWidth = map[0].length;
    let treeCount = 0;

    while (currentPos.y < map.length - 1) {
      currentPos.add(trajectory);
      const char = map[currentPos.y][currentPos.x % slopeWidth];
      if (char === tree) treeCount++;
    }
    return treeCount;
  }

  December.addDay({
    day: 3,
    year: 2020,
    title: 'Toboggan Trajectory',
    questions: [
      'How many trees would you encounter?',
      'What do you get if you multiply together the number of trees encountered on each of the listed slopes?',
    ],
    answer1: puzzle => {
      const map = puzzle.split('\n').filter(x => x);
      return Promise.resolve(findTrees(map, new Vector(3, 1)));
    },
    answer2: puzzle => {
      const map = puzzle.split('\n').filter(x => x);
      const trajectories = [
        new Vector(1, 1),
        new Vector(3, 1),
        new Vector(5, 1),
        new Vector(7, 1),
        new Vector(1, 2),
      ];
      const answer2 = trajectories.reduce((acc, cur) => acc * findTrees(map, cur), 1);
      return Promise.resolve(answer2);
    },
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
        solutions: [7, 336],
      },
    ],
    solutions: [148, 727923200],
  });
})();
