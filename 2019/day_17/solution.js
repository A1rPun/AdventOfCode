
  const PATH = '#';

  function findNeighbours(grid, x, y) {
    return (
      !(y < 1 || y > grid.length - 2 || x < 1 || x > grid[y].length - 1) &&
      grid[y - 1][x] === PATH &&
      grid[y + 1][x] === PATH &&
      grid[y][x - 1] === PATH &&
      grid[y][x + 1] === PATH
    );
  }

  export default {
    day: 17,
    year: 2019,
    title: 'Set and Forget',
    questions: [
      'What is the sum of the alignment parameters for the scaffold intersections?',
      'After visiting every part of the scaffold at least once, how much dust does the vacuum robot report it has collected?',
    ],
    answer1: memory => {
      const outputs = new December.IntCode(memory).run();
      const map = outputs.reduce(
        (acc, cur) => acc + (String.fromCharCode(cur) || 'X'),
        ''
      );
      December.log(map);

      const sumAlignmentParams = map
        .split('\n')
        .reduce(
          (sum, line, y, src) =>
            sum +
            line
              .split('')
              .reduce(
                (acc, scaffold, x) =>
                  scaffold === PATH && findNeighbours(src, x, y)
                    ? x * y + acc
                    : acc,
                0
              ),
          0
        );

      return sumAlignmentParams;
    },
    answer2: memory => {
      const computer = new December.IntCode(memory);
      computer.memory[0] = 2; // Wake up
      // computer.run();
      return;
    },
    example: [],
    solutions: [7584],
  };
