(function (w, d) {
    var NEW_LINE = '\n';
    var code = d.querySelector('.code');
    logCode('AdventOfCode - A1rPun');
    logCode('----------------------------');
    logCode('December 2016');
    var days = December.getDays();
    for (var i = 0; i < days.length; i++) {
        if (!days[i].title) continue;
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
                var answerT = new perfTimer();
                day.getAnswer().then(function (answer) {
                    answerT.stop();
                    logCode('Answer(s):');
                    logCode(answer);
                    logCode(answerT.log());
                    logCode(NEW_LINE);
                });
                var exampleT = new perfTimer();
                day.getExample().then(function (example) {
                    exampleT.stop();
                    logCode('Example(s):');
                    logCode(example);
                    logCode(exampleT.log());
                    logCode(NEW_LINE);
                });
                /*
                var input = day.input();
                if (input) {
                    logCode('Input(s):');
                    //logCode(input);
                    logCode(Array.isArray(input) ? input.slice(0, 10) : input);
                }*/
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
