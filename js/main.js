(function(w, d) {
  const NEW_LINE = '\n';
  var code = d.querySelector('.code');
  function logCode(c, click, seperate = false) {
    var el = d.createElement('div');
    el.innerText =
      typeof c === 'string' || c === 0
        ? c
        : c
        ? JSON.stringify(c, null, 4)
        : '';
    if (click) {
      el.classList.add('click');
      el.addEventListener('click', click);
    }

    if (seperate) el.classList.add('seperator');
    code.appendChild(el);
    return el;
  }
  December.log = function(o, clear) {
    if (clear) clearCode();
    logCode(o);
  };
  showTree();
  logCode('★★ AdventOfCode - A1rPun ★★', null, true);
  var spanYear = logCode();
  logYears();
  var spanDay = logCode(null, null, true);
  logDays();
  code = logCode();

  function clearCode() {
    code.innerHTML = '';
  }

  async function getInputForDay(day) {
    let input = day.input;
    if (!input) {
      const res = await fetch(`${day.year}/day_${day.day}/input`);
      input = await res.text();
      // TODO: might brake days so test :)
      input = input.trim();
    }
    return input;
  }

  async function handleAnswer(day, input) {
    if (day.answer1) {
      const answer1T = new perfTimer();
      const answer1 = await day.answer1(input);
      answer1T.stop();
      logCode(day.questions[0]);
      const line1 = logCode(answer1);

      if (day.solutions[0] === answer1) {
        line1.classList.add('yellow');
      } else {
        line1.classList.add('red');
        logCode(`Output should be ${day.solutions[0]}`);
      }
      logCode(NEW_LINE);
      logCode(answer1T.log());
      logCode(NEW_LINE);

      if (day.answer2 && day.questions[1]) {
        const answer2T = new perfTimer();
        const answer2 = await day.answer2(input);
        answer2T.stop();
        logCode(day.questions[1]);
        const line2 = logCode(answer2);
        if (day.solutions[1] === answer2) {
          line2.classList.add('yellow');
        } else {
          line2.classList.add('red');
          logCode(`Output should be ${day.solutions[1]}`);
        }
        logCode(NEW_LINE);
        logCode(answer2T.log());
      }
    } else {
      const answerT = new perfTimer();
      let answer = await day.answer(input);
      answerT.stop();

      if (!Array.isArray(answer)) answer = [answer];

      for (let i = 0; i < answer.length; i++) {
        const question = Array.isArray(day.questions)
          ? day.questions[i]
          : day.questions;
        logCode(question);
        logCode(answer[i]).classList.add('yellow');
        logCode(NEW_LINE);
      }
      logCode(answerT.log());
    }
  }

  async function handleExample(day, example) {
    if (typeof example === 'string') {
      handleAnswer(day, example);
      return;
    }
    logCode('Example input');
    logCode(`${example.input}`);
    logCode(NEW_LINE);

    if (!example.answer || example.answer & 1) {
      const answer1T = new perfTimer();
      const answer1 = await day.answer1(example.input);
      answer1T.stop();
      const line1 = logCode(answer1);

      if (example.solutions[0] === answer1) {
        line1.classList.add('yellow');
      } else {
        line1.classList.add('red');
        logCode(`Output should be ${example.solutions[0]}`);
      }
      logCode(NEW_LINE);
      logCode(answer1T.log());
      logCode(NEW_LINE);
    }

    if (!example.answer || example.answer & 2) {
      const answer2T = new perfTimer();
      const answer2 = await day.answer2(example.input);
      answer2T.stop();
      const line2 = logCode(answer2);

      if (example.solutions[1] === answer2) {
        line2.classList.add('yellow');
      } else {
        line2.classList.add('red');
        logCode(`Output should be ${example.solutions[1]}`);
      }
      logCode(NEW_LINE);
      logCode(answer2T.log());
      logCode(NEW_LINE);
    }
  }

  function dayClick(day) {
    return function() {
      spanDay.innerHTML = '';

      const back = d.createElement('div');
      back.classList.add('click', 'text-center');
      back.innerText = '<< Back <<';
      back.addEventListener('click', function() {
        clearCode();
        logDays();
      });
      spanDay.appendChild(back);

      const title = d.createElement('div');
      title.classList.add('text-center');
      setDayTitle(title, day);
      spanDay.appendChild(title);

      if (day.hasAnimation) {
        const anim = d.createElement('div');
        anim.classList.add('click', 'animated', 'text-center');
        anim.innerText = `Animation = ${December.animate}`;
        anim.addEventListener('click', function() {
          December.animate = !December.animate;
          this.innerHTML = `Animation = ${December.animate}`;
        });
        spanDay.appendChild(anim);
      }

      const ans = d.createElement('div');
      ans.classList.add('click', 'text-center');
      ans.innerText = 'Show answers';
      ans.addEventListener('click', async function() {
        clearCode();
        const input = await getInputForDay(day);
        handleAnswer(day, input);
      });
      spanDay.appendChild(ans);

      if (day.example && day.example.length) {
        const example = d.createElement('div');
        example.classList.add('click', 'text-center');
        example.innerText = 'Show example';
        example.addEventListener('click', async function() {
          clearCode();
          for (let i = 0; i < day.example.length; i++) {
            await handleExample(day, day.example[i]);
          }
        });
        spanDay.appendChild(example);
      }

      const input = d.createElement('div');
      input.classList.add('click', 'text-center');
      input.innerText = 'Show input';
      input.addEventListener('click', async function() {
        clearCode();
        const input = await getInputForDay(day);
        logCode(input);
      });
      spanDay.appendChild(input);

      const custom = d.createElement('textarea');
      custom.rows = 1;
      custom.classList.add('line');
      custom.addEventListener('input', function(e) {
        cheat.classList[this.value ? 'remove' : 'add']('hidden');
      });
      spanDay.appendChild(custom);

      const cheat = d.createElement('div');
      cheat.classList.add('click', 'hidden');
      cheat.innerText = 'Execute';
      cheat.addEventListener('click', function() {
        clearCode();
        handleAnswer(day, custom.value);
      });
      spanDay.appendChild(cheat);
    };
  }

  function setDayTitle(el, day) {
    const solutions = day.solutions ? day.solutions.length : 2;

    if (!solutions) {
      el.classList.add('development');
    }

    el.innerHTML = `Day ${day.day.toString().padStart(2, '0')} ${
      solutions === 2
        ? '<span class="yellow">★</span>'
        : solutions >= 1
        ? '<span class="first-only">★</span>'
        : ' '
    }${solutions === 2 ? '<span class="yellow">★</span>' : ' '} ${day.title}`;
  }

  function logDays() {
    spanDay.innerHTML = '';
    spanDay.classList.add('text-left');
    var days = December.getDays();
    for (var i = 0; i < days.length; i++) {
      const decDay = days[i];
      var day = d.createElement('div');
      if (decDay.hasAnimation) {
        day.classList.add('animated');
      }
      if (decDay.day && decDay.title) {
        setDayTitle(day, decDay);
        day.classList.add('click');
        day.addEventListener('click', dayClick(decDay));
      } else {
        day.innerText = `Day ${(i + 1).toString().padStart(2, '0')}    ${
          decDay.title
        }`;
        day.classList.add('unsolved');
      }
      spanDay.appendChild(day);
    }
  }

  function logYears() {
    spanYear.innerHTML = '';
    var years = December.getYears();
    var totalScore = 0;

    for (var i = 0, l = years.length; i < l; i++) {
      var option = d.createElement('span');
      var year = years[i];
      option.innerHTML = `[${year.year}]<small class="yellow darken">★${
        year.score
      }</small>`;
      option.classList.add('click', 'option');
      option.addEventListener('click', switchYear(year.year));
      if (December.currentYear === year.year) option.classList.add('active');
      spanYear.appendChild(option);
      totalScore += year.score;
    }
    var total = d.createElement('span');
    total.innerHTML = `Total<small class="yellow darken">★${totalScore}</small>`;
    spanYear.appendChild(total);
  }

  function switchYear(year) {
    return function() {
      December.currentYear = year;
      logYears();
      logDays();
      clearCode();
    };
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
      O: '<span class="blue">O</span>',
      o: '<span class="orange">o</span>',
    };
    const html = tree
      .split('')
      .reduce(
        (prev, curr) => prev + (mapping[curr] ? mapping[curr] : curr),
        ''
      );
    const span = logCode();
    span.innerHTML = html;
    span.classList.add('white');
  }
})(window, document);
