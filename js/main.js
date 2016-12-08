(function (w, d) {
    var NEW_LINE = '\n';
    var code = d.querySelector('.code');
    logCode('AdventOfCode - 2016 - A1rPun');
    logCode('----------------------------');
    var days = December.getDays();
    for (var i = 0; i < days.length; i++) {
        if (days[i].title)
            logCode('Day ' + days[i].day, (function (day) {
                return function () {
                    code.innerHTML = '';
                    if (day.title) {
                        logCode('--- Day ' + day.day + ': ' + day.title + ' ---');
                        logCode(NEW_LINE);
                    }
                    if (day.questions) {
                        logCode('Question(s):');
                        logCode(day.questions);
                        logCode(NEW_LINE);
                    }
                    timer.start();
                    var answer = day.answer();
                    timer.stop();
                    if (answer) {
                        logCode('Answer(s):');
                        logCode(answer);
                        logCode(timer.log());
                        logCode(NEW_LINE);
                    }
                    timer.start();
                    var example = day.example();
                    timer.stop();
                    if (example) {
                        logCode('Example(s):');
                        logCode(example);
                        logCode(timer.log());
                        logCode(NEW_LINE);
                    }
                    var input = day.input();
                    if (input) {
                        logCode('Input(s):');
                        logCode(input);
                        //logCode(Array.isArray(input) ? input.slice(0, 10) : input);
                    }
                };
            }(days[i])));
    }
    logCode(NEW_LINE);
    var results = d.createElement('span');
    code.appendChild(results);
    code = results;

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
}(window, document));
