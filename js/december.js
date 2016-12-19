/*
{
    day: 0,
    title: 'Foo',
    questions: ['Bar', 'Quux'],
    answer: day_0,
    input: getInput,
    example: getExample
}
 */
var December = (function () {
    function noop() { return new Promise.reject(); }
    function curryAnswer(answer, input) {
        return function () {
            return answer(input(), december.animate);
        };
    }
    var days = [];
    var december = {
        animate: true,
        addDay: function (d) {
            d.getAnswer = d.input ? curryAnswer(d.answer, d.input) : noop;
            d.getExample = d.example ? curryAnswer(d.answer, d.example) : noop;
            days.push(d);
        },
        getDays: function (d) {
            return days;
        },
        log: function (object, clear) {
            clear && console.clear();
            console.log(object);
        },
        prettify: function (jagged) {
            var result = '';
            for (var i = 0; i < jagged.length; i++)
                result += jagged[i].join('') + '\n';
            return result;
        },
        count: function (str, char) {
            return (str.match(new RegExp(char, 'g')) || []).length;
        }
    };
    return december;
}());
