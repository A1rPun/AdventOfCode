import years from './module.js';
import { setSink } from './js/december.js';

setSink(() => {});

const exclude = [
  /* Add */
  [2016, 8],
  [2017, 3],
  [2017, 15],
  [2017, 23],
  [2019, 2],
  /* Fix */
  [2015, 4],
  [2016, 1],
  [2016, 5],
  [2016, 13],
  [2016, 14],
  [2017, 21],
  [2018, 6],
  [2018, 9],
  [2019, 3],
  [2021, 9], // Node?
  [2021, 10], // Node?
  [2021, 16],
  [2021, 18],
  [2021, 19],
  [2021, 22],
  [2021, 23],
  /* Slow */
  [2016, 16],
  [2016, 18],
  [2017, 14],
  [2017, 17],
  [2017, 22],
  [2019, 10],
  /* Solve */
  [2018, 19],
  [2019, 7],
  [2019, 22],
  [2019, 24],
  [2020, 4],
];

const days = years.flatMap((x, i) =>
  x.map((y, j) => ({
    year: 2015 + i,
    day: 1 + j,
    ...y,
  }))
);

const getTitle = (yy, dd, n, s) =>
  `Year: ${yy}, Day ${dd}${n ? `, Answer ${n}` : ''}${s ? `, Test ${s}` : ''}`;

async function handleAnswer(answer, input) {
  return await Promise.resolve(answer(input, false));
}

days.forEach(async function (x) {
  if (!x.title || exclude.find(([yy, dd]) => yy === x.year && dd === x.day)) {
    return;
  }

  x.example?.forEach(async function (example, s, { length }) {
    if (typeof example === 'string') {
      if (!x.exampleSolutions) return;

      test(getTitle(x.year, x.day), async function () {
        const [a1, a2] = await handleAnswer(x.answer, example);
        const [s1, s2] = x.exampleSolutions;
        if (s1 !== undefined) expect(a1).toBe(s1);
        if (s2 !== undefined) expect(a2).toBe(s2);
      });

      return;
    }

    if (!example.solutions) return;

    const [s1, s2] = example.solutions;
    const step = length > 1 ? s + 1 : 0;

    if (x.answer1 && s1 !== undefined) {
      test(getTitle(x.year, x.day, 1, step), async function () {
        const a1 = await handleAnswer(x.answer1, example.input);
        expect(a1).toBe(s1);
      });
    }

    if (x.answer2 && s2 !== undefined) {
      test(getTitle(x.year, x.day, 2, step), async function () {
        const a2 = await handleAnswer(x.answer2, example.input);
        expect(a2).toBe(s2);
      });
    }
  });
});
