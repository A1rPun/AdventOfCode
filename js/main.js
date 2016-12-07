(function (w) {
    var code = document.getElementById('code');
    function logCode(c) {
        code.innerHTML += (typeof c === 'string' ? c : JSON.stringify(c, null, 4)) + '\n';
    }
    logCode('AdventOfCode - 2016 - A1rPun');
    logCode('----------------------------');
    var days = December.getDays();
    for (var i = 0; i < days.length; i++) {
        var day = days[i];
        logCode('Day ' + (i + 1));
        logCode('------');
        if (day.questions) {
            logCode('Question(s):');
            logCode(day.questions);
        }
        /*
        if (day.input) {
            logCode('Input:');
            logCode(day.input);
        }
        */
        var answer = day.answer();
        if (answer) {
            logCode('Answer(s):');
            logCode(answer);
        }
        var example = day.example();
        if (example) {
            logCode('Example(s):');
            logCode(example);
        }
        logCode('\n');
    }
    var inputs = [];
}(window));