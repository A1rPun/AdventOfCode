// const dectoBin = (dec) => Object.values(dec).map(x => x < half ? '1' : '0').join('');

export default {
  title: 'Test',
  questions: ['a', 'b'],
  answer1: (puzzle) => {
    const lines = puzzle.split('\n')
    const abc = lines.reduce((acc, cur) => {
      const idx = cur.split('');
      idx.forEach((x, i) => {
        if (!acc[i]) acc[i] = 0;
        if (x === '1') acc[i]++;
      });
      return acc;
    }, {});

    const half = Math.floor(lines.length / 2);
    const gamma = Object.values(abc).map(x => x > half ? '1' : '0').join('');
    const epsilon = Object.values(abc).map(x => x < half ? '1' : '0').join('');

    console.log(half, gamma, epsilon);
    console.log(abc);

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
  },
  answer2: (puzzle) => { },
  example: [
    {
      input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
      solutions: [198],
    },
  ],
  solutions: [],
};
