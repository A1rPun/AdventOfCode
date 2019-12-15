var December = (function() {
  var days = {
    '2015': [],
    '2016': [],
    '2017': [],
    '2018': [],
    '2019': [],
  };
  var december = {
    currentYear: '2019',
    addDay: function(d) {
      days[d.year].push(d);
      for (const fn in d.public)
        if (d.public.hasOwnProperty(fn)) {
          this[fn] = d.public[fn];
        }
    },
    animate: true,
    getDays: () => days[december.currentYear],
    getYears: function() {
      const years = [];
      for (const year in days) {
        const day = days[year];
        years.push({
          year,
          score: day.reduce(
            (acc, curr) =>
              acc +
              (curr.title ? (curr.solutions ? curr.solutions.length : 2) : 0),
            0
          ),
        });
      }
      return years;
    },
    // Shared utility functions
    count: (str, char) => (str.match(new RegExp(char, 'g')) || []).length,
    getNumbers: str => str.match(/-?\d+/g).map(december.toInt),
    prettify: function(jagged, char) {
      var result = '';
      char = char || '';
      for (var i = 0; i < jagged.length; i++)
        result += jagged[i].join(char) + '\n';
      return result;
    },
    range: num => [...Array(num).keys()],
    // Rotate + = left, - = right
    rotate: (arr, n) => arr.slice(n, arr.length).concat(arr.slice(0, n)),
    sum: (a, b) => a + b,
    toInt: x => parseInt(x, 10),
  };
  return december;
})();
