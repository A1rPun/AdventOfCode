(function() {
  function day_6(puzzle) {
    const coordinates = puzzle.split('\n').map((c, i) => {
      const [x, y] = December.getNumbers(c);
      return { x, y, id: 65 + i };
    });
    const invalidChars = {};
    const grid = [];
    let answer2 = 0;

    for (let y = 0; y < 400; y++) {
      for (let x = 0; x < 400; x++) {
        const coordinate = { x, y };
        coordinates.forEach(x => (x.distance = AStar.prototype.ManhattanDistance(x, coordinate)));
        coordinates.sort((a, b) =>
          a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0
        );
        const char =
          coordinates[0].distance !== coordinates[1].distance
            ? String.fromCharCode(coordinates[0].id)
            : '.';
        grid[400 * y + x] = char;
        if (x === 0 || x === 399 || y === 0 || y === 399)
          invalidChars[char] = true;
        if (coordinates.reduce((a, b) => a + b.distance, 0) < 10000) answer2++;
      }
    }

    const letters = grid.reduce((acc, curr) => {
      if (!invalidChars[curr]) {
        if (!acc[curr]) acc[curr] = 0;
        acc[curr]++;
      }
      return acc;
    }, {});

    const answer1 = Math.max(...Object.values(letters));
    return Promise.resolve([answer1, answer2]);
  }
  December.addDay({
    day: 6,
    year: 2018,
    title: 'Chronal Coordinates',
    questions: "What is the size of the largest area that isn't infinite?",
    answer: day_6,
    example: [
      `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`,
    ],
  });
})();
