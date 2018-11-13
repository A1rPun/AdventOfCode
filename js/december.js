/*
{
    day: 0,
    year: 0,
    title: 'Foo',
    questions: ['Bar', 'Quux'],
    answer: day_0,
    input: getInput,
    example: getExample
}
 */
var December = (function () {
    function noop() { return Promise.reject(); }
    function curryAnswer(answer, input) {
        return function () {
            return answer(input(), december.animate);
        };
    }
    var days = {
        '2015': [],
        '2016': [],
        '2017': [],
        '2018': [],
    };
    var december = {
        currentYear: '2017',
        addDay: function (d) {
            d.getAnswer = d.input ? curryAnswer(d.answer, d.input) : noop;
            d.getExample = d.example ? curryAnswer(d.answer, d.example) : noop;
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
            return Object.keys(days);
        },
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
    };
    return december;
}());
