import 'regenerator-runtime/runtime';
import fs from 'fs';

import years from './module.js';
import { setSink } from './js/december.js';

setSink(() => {});

const exclude = [
  /* Other output */
  [2016, 8],
  [2019, 8],
  /* Slow */
  [2016, 12],
  [2016, 16],
  [2016, 18],
  [2017, 13],
  [2017, 24],
  [2018, 11],
  [2019, 10],
  [2019, 19],
  /* Fix */
  [2015, 3],
  [2015, 4],
  [2016, 1],
  [2016, 5],
  [2016, 13],
  [2016, 14],
  [2016, 15],
  [2016, 22],
  [2017, 3],
  [2017, 19],
  [2017, 21],
  [2017, 22],
  [2017, 25],
  [2018, 6],
  [2018, 9],
  [2018, 19],
  [2019, 3],
  [2019, 7],
  [2021, 9], // Node?
];

const days = years.flatMap((x, i) =>
  x.map((y, j) => ({
    year: 2015 + i,
    day: 1 + j,
    ...y,
  }))
);

const getTitle = (yy, dd, n) =>
  `Year: ${yy}, Day ${dd}${n ? `, Answer ${n}` : ''}`;

async function handleAnswer(answer, input) {
  return await Promise.resolve(answer(input, false));
}

function getInputForDay(x) {
  if (x.input) return x.input;

  try {
    const fileName = `${year}/day_${day.toString().padStart(2, '0')}/input`;
    const data = fs.readFileSync(fileName, 'utf8');
    return data.trim();
  } catch (err) {
    console.error(err);
  }
}

days.forEach(async function (x) {
  if (
    !x.title ||
    !x.solutions?.length ||
    exclude.find(([yy, dd]) => yy === x.year && dd === x.day)
  ) {
    return;
  }

  const input = getInputForDay(x);

  if (x.answer) {
    test(getTitle(x.year, x.day), async function () {
      const [a1, a2] = await handleAnswer(x.answer, input);
      const [s1, s2] = x.solutions;
      if (s1 !== undefined) expect(a1).toBe(s1);
      if (s2 !== undefined) expect(a2).toBe(s2);
    });
    return;
  }

  const [s1, s2] = x.solutions;

  if (x.answer1 && s1 !== undefined) {
    test(getTitle(x.year, x.day, 1), async function () {
      const a1 = await handleAnswer(x.answer1, input);
      expect(a1).toBe(s1);
    });
  }

  if (x.answer2 && s2 !== undefined) {
    test(getTitle(x.year, x.day, 2), async function () {
      const a2 = await handleAnswer(x.answer2, input);
      expect(a2).toBe(s2);
    });
  }
});
