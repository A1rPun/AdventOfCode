(function (w, d) {
    var code = d.querySelector('.code');
    function logCode(c, click) {
        var span = d.createElement('span');
        span.classList.add('line');
        span.innerText = typeof c === 'string' ? c : JSON.stringify(c, null, 4);
        if (click) {
            span.classList.add('click');
            span.addEventListener('click', click);
        }
        code.appendChild(span);
    }
    
    logCode('AdventOfCode - 2016 - A1rPun');
    logCode('----------------------------');
    var days = December.getDays();
    for (var i = 0; i < days.length; i++) {
        logCode('Day ' + (i + 1), (function (day) {
            return function () {
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
                    logCode(timer.log());
                }
                timer.start();
                var example = day.example();
                timer.stop();
                if (example) {
                    logCode('Example(s):');
                    logCode(example);
                    logCode(timer.log());
                }
            };
        }(days[i])));
    }
    var inputs = [];
}(window, document));
