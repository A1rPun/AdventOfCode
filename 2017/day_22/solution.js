(function() {
  function day_22(puzzle) {
    const face = {
      top: 0,
      right: 1,
      bottom: 2,
      left: 3,
    };
    const state = {
      clean: 0,
      weakened: 1,
      infected: 2,
      flagged: 3,
    };
    const virus = puzzle.split('\n').reduce((acc, curr, y) => {
      curr.split('').forEach((val, x) => {
        if (val === '#') acc[`${x}_${y}`] = state.infected;
      });
      return acc;
    }, {});

    let x, y;
    x = y = Math.floor(Math.sqrt(puzzle.length) / 2);
    let direction = face.top;
    let bursts = 10000000;
    let answer1 = 0;
    while (bursts--) {
      const key = `${x}_${y}`;
      const currentNode = virus[key] || 0;

      if (currentNode === state.clean)
        direction = direction === 0 ? 3 : direction - 1;
      else if (currentNode === state.infected) direction = (direction + 1) % 4;
      else if (currentNode === state.flagged) direction = (direction + 2) % 4;
      else answer1++;

      virus[key] = (currentNode + 1) % 4;

      if (direction === face.top) y--;
      else if (direction === face.right) x++;
      else if (direction === face.bottom) y++;
      else x--;
    }
    return answer1;
  }
  December.addDay({
    day: 22,
    year: 2017,
    title: 'Sporifica Virus',
    questions:
      'Given your actual map, after 10000 bursts of activity, how many bursts cause a node to become infected?',
    answer: day_22,
    example: [
      `..#
#..
...`,
    ],
  });
})();
