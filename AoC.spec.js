import days2015 from './2015/module.js';
import days2016 from './2016/module.js';
import days2017 from './2017/module.js';
import days2018 from './2018/module.js';
import days2019 from './2019/module.js';
import days2020 from './2020/module.js';
import days2021 from './2021/module.js';

const exclude = [[2019, 10]];

[days2015, days2016, days2017, days2018, days2019, days2020, days2021].forEach(
  (y, l) =>
    y.forEach((x, i) => {
      const year = 2015 + l;
      const day = i + 1;

      if (!x.title || exclude.find(([yy, dd]) => yy === year && dd === day))
        return;

      x.example?.forEach((example, s) => {
        if (example.solutions && x.answer1) {
          const [a1, a2] = example.solutions;
          if (a1) {
            test(`Year: ${year}, Day ${day}, Test ${s + 1}, Answer 1`, () =>
              expect(x.answer1(example.input)).toBe(a1));
          }
          if (a2) {
            test(`Year: ${year}, Day ${day}, Test ${s + 1}, Answer 2`, () =>
              expect(x.answer2(example.input)).toBe(a2));
          }
        } else {
          // const [example] = x.example;
          // const [a1, a2] = x.answer(example.input);
          // expect().toBe(a1);
        }
      });
    })
);
