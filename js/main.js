(function (w, d) {
    const NEW_LINE = '\n';
    const seperator = '--------------------------------------------------';
    var code = d.querySelector('.code');
    function logCode(c, click) {
        var span = d.createElement('span');
        span.classList.add('line');
        span.innerText = typeof c === 'string' ? c : (c ? JSON.stringify(c, null, 4) : '');
        if (click) {
            span.classList.add('click');
            span.addEventListener('click', click);
        }
        code.appendChild(span);
        return span;
    }
    December.log = function (o, clear) {
        if (clear)
            clearCode();
        logCode(o);
    };
    showTree();
    logCode('★★ AdventOfCode - A1rPun ★★');
    logCode(seperator);
    var spanYear = logCode();
    logYears();
    logCode(seperator);
    var spanDay = logCode();
    logDays();
    logCode(seperator);
    code = logCode();

    function clearCode() {
        code.innerHTML = '';
    }

    async function getInputForDay(day) {
        let input = day.input;
        if (!input) {
            const res = await fetch(`${day.year}/day_${day.day}/input`);
            input = await res.text();
        }
        return input;
    }

    function handleAnswer(day, input) {
        const answerT = new perfTimer();
        day.answer(input, December.animate).then(function (answer) {
            answerT.stop();
            if (Array.isArray(answer)) {
                for (let i = 0; i < answer.length; i++) {
                    const question = Array.isArray(day.questions)
                        ? day.questions[i]
                        : day.questions;
                    logCode(question);
                    logCode(answer[i]).classList.add('yellow');
                    logCode(NEW_LINE);
                }
            } else {
                const question = Array.isArray(day.questions)
                    ? day.questions[day.questions.length - 1]
                    : day.questions;
                logCode(question);
                logCode(answer).classList.add('yellow');
                logCode(NEW_LINE);
            }
            logCode(answerT.log());
        });
    }

    function dayClick(day) {
        return function () {
            spanDay.innerHTML = '';

            const back = d.createElement('span');
            back.classList.add('line', 'click');
            back.innerText = '<< Back <<';
            back.addEventListener('click', function () {
                clearCode();
                logDays();
            });
            spanDay.appendChild(back);

            const title = d.createElement('span');
            title.innerText = `Day ${day.day.toString().padStart(2, '0')} - ${day.title}`;
            spanDay.appendChild(title);

            if (day.hasAnimation) {
                const anim = d.createElement('span');
                anim.classList.add('line', 'click', 'animated');
                anim.innerText = `Animation = ${December.animate}`;
                anim.addEventListener('click', function () {
                    December.animate = !December.animate
                    this.innerHTML = `Animation = ${December.animate}`;
                });
                spanDay.appendChild(anim);
            }

            const ans = d.createElement('span');
            ans.classList.add('line', 'click');
            ans.innerText = 'Show answers';
            ans.addEventListener('click', async function () {
                clearCode();
                const input = await getInputForDay(day);
                handleAnswer(day, input);
            });
            spanDay.appendChild(ans);

            const example = d.createElement('span');
            example.classList.add('line', 'click');
            example.innerText = 'Show example';
            example.addEventListener('click', function () {
                clearCode();
                handleAnswer(day, day.example());
            });
            spanDay.appendChild(example);

            const input = d.createElement('span');
            input.classList.add('line', 'click');
            input.innerText = 'Show input';
            input.addEventListener('click', async function () {
                clearCode();
                const input = await getInputForDay(day);
                logCode(input);
            });
            spanDay.appendChild(input);

            const custom = d.createElement('textarea');
            custom.rows = 1;
            custom.classList.add('line');
            custom.addEventListener('input', function (e) {
                cheat.classList[this.value ? 'remove' : 'add']('hidden');
            });
            spanDay.appendChild(custom);

            const cheat = d.createElement('span');
            cheat.classList.add('line', 'click', 'hidden');
            cheat.innerText = 'Execute';
            cheat.addEventListener('click', function () {
                clearCode();
                handleAnswer(day, custom.value);
            });
            spanDay.appendChild(cheat);
        };
    }

    function logDays() {
        spanDay.innerHTML = '';
        var days = December.getDays();
        for (var i = 0; i < days.length; i++) {
            const decDay = days[i];
            var day = d.createElement('span');
            day.classList.add('line');
            if (decDay.hasAnimation) {
                day.classList.add('animated');
            }
            if (decDay.development) {
                day.classList.add('unsolved', 'development');
            }
            if (decDay.title) {
                day.innerText = `Day ${decDay.day.toString().padStart(2, '0')} - ${decDay.title}`;
                day.classList.add('click');
                day.addEventListener('click', dayClick(decDay));
            } else {
                day.innerText = `Day ${i + 1}`;
                day.classList.add('unsolved');
            }
            spanDay.appendChild(day);
        }
    }

    function logYears() {
        spanYear.innerHTML = '';
        var years = December.getYears();
        for (var i = 0, l = years.length; i < l; i++) {
            var option = d.createElement('span');
            var year = years[i];
            option.innerHTML = `${year.year}<span class="yellow darken">★${year.score}</span>`;
            option.classList.add('click', 'option');
            option.addEventListener('click', switchYear(year.year));
            if (December.currentYear === year.year) {
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
            clearCode();
        }
    }

    function showTree() {
        const tree = `|
\\|/
--*--
>o<
>O<<<
>>*>>*<
>>o>>@>*<
>>O>>o>*<<<
>>@>*>>*<<<o<
>>*>O<<@>O<o<<<
>O<@>>>O>@>>>o<<<
_ __|_|__ _`;
        const mapping = {
            '\\': '<span class="yellow">\\</span>',
            '/': '<span class="yellow">/</span>',
            '|': '<span class="yellow">|</span>',
            '>': '<span class="green">&gt;</span>',
            '<': '<span class="green">&lt;</span>',
            '*': '<span class="yellow">*</span>',
            '@': '<span class="red">@</span>',
            'O': '<span class="blue">O</span>',
            'o': '<span class="orange">o</span>',
        };
        const html = tree.split('').reduce((prev, curr) => prev + (mapping[curr] ? mapping[curr] : curr), '');
        const span = logCode();
        span.innerHTML = html;
        span.classList.add('white');
        logCode(seperator);
    }

}(window, document));
