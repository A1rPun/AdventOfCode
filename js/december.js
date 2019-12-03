var December = (function () {
    var days = {
        '2015': [],
        '2016': [],
        '2017': [],
        '2018': [],
        '2019': [],
    };
    var december = {
        currentYear: '2018',
        addDay: function (d) {
            days[d.year].push(d);
            for (const fn in d.public) if (d.public.hasOwnProperty(fn)) {
                this[fn] = d.public[fn];
            }
        },
        animate: true,
        count: function (str, char) {
            return (str.match(new RegExp(char, 'g')) || []).length;
        },
        getDays: function (d) {
            return days[this.currentYear];
        },
        getNumbers: function (str) {
            return str.match(/\d+/g).map(function (x) { return +x; });
        },
        getYears: function () {
            const years = [];
            for (const year in days) {
                const day = days[year];
                years.push({
                    year,
                    score: day.reduce((acc, curr) => acc + (curr.title && !curr.development ? 2 : 0), 0),
                });
            }
            return years;
        },
        plus: (a, b) => a + b,
        prettify: function (jagged, char) {
            var result = '';
            char = char || '';
            for (var i = 0; i < jagged.length; i++)
                result += jagged[i].join(char) + '\n';
            return result;
        },
        range: function (num) {
            return [...Array(num).keys()];
        },
        // Rotate + = left, - = right
        rotate: function (arr, n) {
            return arr.slice(n, arr.length).concat(arr.slice(0, n));
        },
        toInt: x => parseInt(x, 10),
    };
    return december;
}());
