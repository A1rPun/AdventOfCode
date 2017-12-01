(function (w, d) {
    var NEW_LINE = '\n';
    var code = d.querySelector('.code');
    December.log = function (o, clear) {
        if (clear)
            clearCode();
        logCode(o);
    };
    logCode('AdventOfCode - A1rPun');
    logCode('----------------------------');
    logCode('Animation = true', function () {
        December.animate = !December.animate
        this.innerHTML = 'Animation = ' + (December.animate ? 'true' : 'false');
    });
    logCode('----------------------------');
    var spanYear = d.createElement('span');
    logYears();
    code.appendChild(spanYear);
    logCode('----------------------------');
    var spanDay = d.createElement('span');
    logDays();
    code.appendChild(spanDay);
    logCode('----------------------------');
    var results = d.createElement('span');
    code.appendChild(results);
    code = results;

    function clearCode() {
        code.innerHTML = '';
    }

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

    function dayClick(day) {
        return function () {
            clearCode();
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
    }

    function logDays() {
        spanDay.innerHTML = '';
        var days = December.getDays();
        for (var i = 0; i < days.length; i++) {
            if (!days[i].title) continue;
            var day = d.createElement('span');
            day.classList.add('line');
            day.innerText = 'Day ' + days[i].day;
            day.classList.add('click');
            day.addEventListener('click', dayClick(days[i]));
            spanDay.appendChild(day);
        }
    }

    function logYears() {
        spanYear.innerHTML = '';
        var years = December.getYears();
        for (var i = 0, l = years.length; i < l; i++) {
            var option = d.createElement('span');
            var value = years[i];
            option.innerHTML = value;
            option.classList.add('click', 'option');
            option.addEventListener('click', switchYear(value));
            if (December.currentYear === value) {
                option.classList.add('active');
            }
            spanYear.appendChild(option);
        }
    }

    function switchYear(year) {
        return function () {
            December.currentYear = year;
            logYears();
            logDays();
        }        
    }
}(window, document));
