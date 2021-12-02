var days = {
  2015: [],
  2016: [],
  2017: [],
  2018: [],
  2019: [],
  2020: [],
  2021: [],
};
var december = {
  currentYear: '2021', // TODO: Please...
  addDay: function (d) {
    days[d.year].push(d);
    for (const fn in d.public)
      if (d.public.hasOwnProperty(fn)) {
        this[fn] = d.public[fn];
      }
  },
  animate: true,
  getDays: () => days[december.currentYear],
  getYears: function () {
    const years = [];
    for (const year in days) {
      const day = days[year];
      years.push({
        year,
        score: day.reduce(
          (acc, curr) =>
            acc +
            (curr.day && curr.title
              ? curr.solutions
                ? curr.solutions.length
                : 2
              : 0),
          0
        ),
      });
    }
    return years;
  },
  // Shared utility functions
  cache: fn => {
    const cache = new Map();
    return (...args) => {
      const cacheKey = args.join('');
      if (cache.has(cacheKey)) return cache.get(cacheKey);
      const result = fn(...args);
      cache.set(cacheKey, result);
      return result;
    };
  },
  count: (str, char) => (str.match(new RegExp(char, 'g')) || []).length,
  getNumbers: str => str.match(/-?\d+/g).map(december.toInt),
  prettify: function (jagged, char) {
    var result = '';
    char = char || '';
    for (var i = 0; i < jagged.length; i++)
      result += jagged[i].join(char) + '\n';
    return result;
  },
  range: (max, min = 0, mapFn) => {
    const fn = mapFn ? (_, i) => mapFn(i + min) : (_, i) => i + min;
    return Array.from(Array(max), fn);
  },
  // Rotate + = left, - = right
  rotate: (arr, n) => arr.slice(n, arr.length).concat(arr.slice(0, n)),
  sum: (a, b) => a + b,
  toInt: x => parseInt(x, 10),
  log: (...args) => console.log(...args),
};

export default december;
