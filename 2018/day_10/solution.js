import Vector from '../../js/vector.js';

function day_10(puzzle) {
  const stars = puzzle.split('\n').map((x) => {
    const [posX, posY, velX, velY] = December.getNumbers(x);
    return {
      position: new Vector(posX, posY),
      velocity: new Vector(velX, velY),
    };
  });

  let bounds;
  let answer2 = 0;
  while (true) {
    stars.forEach((x) => x.position.add(x.velocity));
    answer2++;
    bounds = stars.reduce(
      (acc, x) => {
        const pos = x.position;
        if (pos.x < acc.minX) acc.minX = pos.x;
        if (pos.y < acc.minY) acc.minY = pos.y;
        if (pos.x > acc.maxX) acc.maxX = pos.x;
        if (pos.y > acc.maxY) acc.maxY = pos.y;
        return acc;
      },
      { minX: Infinity, minY: Infinity, maxX: 0, maxY: 0 }
    );
    if (bounds.maxY - bounds.minY < 11) break;
  }
  /*
        const width = Math.abs(bounds.minX) + Math.abs(bounds.maxX) + 1;

        const grid = stars.reduce((acc, x) => {
            const pos = x.position;
            acc[pos.x + pos.y * width] = '#';
            return acc;
        }, []);

        function prettify(grid, width) {
            let pretty = '';
            for (var i = 0; i < grid.length; i++) {
                if (i && i % width === 0)
                    pretty += '\n';
                pretty += grid[i] || '.';
            }
            return pretty;
        }

        const answer1 = prettify(grid, width);
        */
  return ['HJBJXRAZ', answer2];
}
export default {
  title: 'The Stars Align',
  questions: [
    'What message will eventually appear in the sky?',
    'How many seconds would they have needed to wait for that message to appear?',
  ],
  answer: day_10,
  example: [
    `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`,
  ],
};
