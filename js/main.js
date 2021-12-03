import perfTimer from './perfTimer.js';
import years from '../module.js';
import December from './december.js';

December.log = function (o, clear) {
  if (clear) clearCode();
  logCode(o);
};

let code, spanYear, spanDay;
let animate = true;
let currentYear = years.length - 1;
const d = document;
const NEW_LINE = '\n';

main();

function main() {
  code = d.querySelector('.code');
  showTree();
  logCode('★★ AdventOfCode - A1rPun ★★', null, true);
  spanYear = logCode();
  logYears();
  spanDay = logCode(null, null, true);
  logDays();
  code = logCode();
}

function logCode(c, click, seperate = false) {
  const el = d.createElement('div');
  el.innerText =
    typeof c === 'string' || c === 0 ? c : c ? JSON.stringify(c, null, 4) : '';
  if (click) {
    el.classList.add('click');
    el.addEventListener('click', click);
  }

  if (seperate) el.classList.add('seperator');
  code.appendChild(el);
  return el;
}

function clearCode() {
  code.innerHTML = '';
}

async function getInputForDay(day, dd) {
  if (day.input) return day.input;
  const res = await fetch(`${2015 + currentYear}/day_${dd}/input`);
  const input = await res.text();
  return input.trim();
}

async function getAnswer(answer) {
  return await Promise.resolve(answer);
}

async function handleAnswer(day, input) {
  if (day.answer1) {
    const answer1T = new perfTimer();
    const answer1 = await getAnswer(day.answer1(input, animate));
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
      const answer2 = await getAnswer(day.answer2(input, animate));
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
    let answer = await getAnswer(day.answer(input, animate));
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

  const answer1T = new perfTimer();
  const answer1 = await getAnswer(day.answer1(example.input, animate));
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

  const answer2T = new perfTimer();
  const answer2 = await getAnswer(day.answer2(example.input, animate));
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

function dayClick(day, dd) {
  return function () {
    spanDay.innerHTML = '';

    const back = d.createElement('div');
    back.classList.add('click', 'text-center');
    back.innerText = '<< Back <<';
    back.addEventListener('click', function () {
      clearCode();
      logDays();
    });
    spanDay.appendChild(back);

    const title = d.createElement('div');
    title.classList.add('click', 'text-center');
    title.addEventListener('click', function () {
      window.open(`https://adventofcode.com/${day.year}/day/${day.day}`);
    });
    setDayTitle(title, day, dd);
    spanDay.appendChild(title);

    if (day.hasAnimation) {
      const anim = d.createElement('div');
      anim.classList.add('click', 'animated', 'text-center');
      anim.innerText = `Animation = ${animate}`;
      anim.addEventListener('click', function () {
        animate = !animate;
        this.innerHTML = `Animation = ${animate}`;
      });
      spanDay.appendChild(anim);
    }

    const ans = d.createElement('div');
    ans.classList.add('click', 'text-center');
    ans.innerText = 'Show answers';
    ans.addEventListener('click', async function () {
      clearCode();
      const input = await getAnswer(getInputForDay(day, dd));
      handleAnswer(day, input);
    });
    spanDay.appendChild(ans);

    if (day.example && day.example.length) {
      const example = d.createElement('div');
      example.classList.add('click', 'text-center');
      example.innerText = 'Show example';
      example.addEventListener('click', async function () {
        clearCode();
        for (let i = 0; i < day.example.length; i++) {
          await getAnswer(handleExample(day, day.example[i]));
        }
      });
      spanDay.appendChild(example);
    }

    const input = d.createElement('div');
    input.classList.add('click', 'text-center');
    input.innerText = 'Show input';
    input.addEventListener('click', async function () {
      clearCode();
      const input = await getInputForDay(day, dd);
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

    const cheat = d.createElement('div');
    cheat.classList.add('click', 'hidden');
    cheat.innerText = 'Execute';
    cheat.addEventListener('click', function () {
      clearCode();
      handleAnswer(day, custom.value);
    });
    spanDay.appendChild(cheat);
  };
}

function setDayTitle(el, day, dd) {
  const solutions = day.solutions ? day.solutions.length : 2;

  if (!solutions) {
    el.classList.add('development');
  }

  el.innerHTML = `Day ${dd.toString().padStart(2, '0')} ${
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
  years[currentYear].forEach((decDay, i) => {
    const day = d.createElement('div');
    const dd = i + 1;
    if (decDay.hasAnimation) {
      day.classList.add('animated');
    }
    if (decDay.title) {
      setDayTitle(day, decDay, dd);
      day.classList.add('click');
      day.addEventListener('click', dayClick(decDay, dd));
    } else {
      day.innerText = `Day ${dd.toString().padStart(2, '0')}    ${
        decDay.title
      }`;
      day.classList.add('unsolved');
    }
    spanDay.appendChild(day);
  });
}

function logYears() {
  spanYear.innerHTML = '';
  let totalScore = 0;
  const scores = years.map((x) =>
    x.reduce((acc, cur) => acc + (cur.solutions?.length ?? 0), 0)
  );
  scores.forEach((score, i) => {
    const option = d.createElement('span');
    const year = 2015 + i;
    option.innerHTML = `[${year}]<small class="yellow darken">★${score}</small>`;
    option.classList.add('click', 'option');
    option.addEventListener('click', switchYear(i));
    if (currentYear === i) option.classList.add('active');
    spanYear.appendChild(option);
    totalScore += score;
  });

  const total = d.createElement('span');
  total.innerHTML = `Total<small class="yellow darken">★${totalScore}</small>`;
  spanYear.appendChild(total);
}

function switchYear(year) {
  return function () {
    currentYear = year;
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
    .reduce((prev, curr) => prev + (mapping[curr] ? mapping[curr] : curr), '');
  const span = logCode();
  span.innerHTML = html;
  span.classList.add('white');
}
