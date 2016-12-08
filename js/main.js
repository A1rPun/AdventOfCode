(function (w) {
    var code = document.getElementById('code');
    function logCode(c) {
        code.innerHTML += (typeof c === 'string' ? c : JSON.stringify(c, null, 4)) + '\n';
    }
    var timer = {
        begin: 0,
        end: 0,
        start: function () {
            this.begin = performance.now();
        },
        stop: function () {
            this.end = performance.now() - this.begin;
        },
        log: function () {
            logCode('Execution took ' + this.end + ' milliseconds.');
        }
    };
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
        timer.start();
        var answer = day.answer();
        timer.stop();
        if (answer) {
            logCode('Answer(s):');
            logCode(answer);
            timer.log();
        }
        timer.start();
        var example = day.example();
        timer.stop();
        if (example) {
            logCode('Example(s):');
            logCode(example);
            timer.log();
        }
        logCode('\n');
    }
    var inputs = [];
}(window));