import perfTimer from './perfTimer.js';
import years from '../module.js';
import tree from './tree.js';

// import { log } from './december.js';
// log = function (o, clear) {
//   if (clear) clearCode();
//   logCode(o);
// };

let code, spanYear, spanDay;
let animate = true;
let currentYear = years.length - 1;

main();

function main() {
  code = document.querySelector('.code');
  showTree();
  logCode('★★ AdventOfCode - A1rPun ★★', null, true);
  spanYear = logCode('');
  logYears();
  spanDay = logCode(null, null, true);
  logDays();
  code = logCode('');
}

function showTree() {
  const span = logCode('');
  span.innerHTML = tree;
  span.classList.add('white');
}

function logCode(c = '\n', click, seperate = false) {
  const el = document.createElement('div');
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

function logYears() {
  spanYear.innerHTML = '';
  let totalScore = 0;
  const scores = years.map((x) =>
    x.reduce((acc, cur) => {
      return acc + (cur.solutions ? cur.solutions?.length ?? 0 : 2);
    }, 0)
  );
  scores.forEach((score, i) => {
    const option = document.createElement('span');
    const year = 2015 + i;
    option.innerHTML = `[${year}]<small class="yellow darken">★${score}</small>`;
    option.classList.add('click', 'option');
    option.addEventListener('click', switchYear(i));
    if (currentYear === i) option.classList.add('active');
    spanYear.appendChild(option);
    totalScore += score;
  });

  const total = document.createElement('span');
  total.innerHTML = `Total<small class="yellow darken">★${totalScore}</small>`;
  spanYear.appendChild(total);
}

function logDays() {
  spanDay.innerHTML = '';
  spanDay.classList.add('text-left');
  years[currentYear].forEach((decDay, i) => {
    const day = document.createElement('div');
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

async function logAnswer(question, fn, solution, input) {
  const answerT = new perfTimer();
  let answer = await Promise.resolve(fn(input, animate));
  answerT.stop();

  logCode(question);
  const line = logCode(answer);

  if (solution === answer) {
    line.classList.add('yellow');
  } else {
    line.classList.add('red');
    logCode(`Output should be ${solution}`);
  }
  logCode();
  logCode(answerT.log());
  logCode();
}

async function handleAnswer(day, input) {
  const answer1 = day.answer1
    ? day.answer1
    : (input, animate) => day.answer(input, animate)[0];
  const answer2 = day.answer2
    ? day.answer2
    : (input, animate) => day.answer(input, animate)[1];
  const questions =
    typeof day.questions === 'string'
      ? [day.questions, day.questions]
      : day.questions;

  logAnswer(questions[0], answer1, day.solutions[0], input);
  logAnswer(questions[1], answer2, day.solutions[1], input);
}

async function handleExample(day, example) {
  const answer1 = day.answer1
    ? day.answer1
    : (input, animate) => day.answer(input, animate)[0];
  const answer2 = day.answer2
    ? day.answer2
    : (input, animate) => day.answer(input, animate)[1];

  const oldStyle = typeof example === 'string';
  const exampleInput = oldStyle ? example : example.input;
  const solution1 = oldStyle ? day.exampleSolutions?.[0] : example.solutions[0];
  const solution2 = oldStyle ? day.exampleSolutions?.[1] : example.solutions[1];

  logCode('Example input');
  logCode(`${exampleInput}`);
  logCode();

  logAnswer('', answer1, solution1, exampleInput);
  logAnswer('', answer2, solution2, exampleInput);
}

function dayClick(day, dd) {
  return function () {
    spanDay.innerHTML = '';

    const back = document.createElement('div');
    back.classList.add('click', 'text-center');
    back.innerText = '<< Back <<';
    back.addEventListener('click', function () {
      clearCode();
      logDays();
    });
    spanDay.appendChild(back);

    const title = document.createElement('div');
    title.classList.add('click', 'text-center');
    title.addEventListener('click', function () {
      window.open(`https://adventofcode.com/${2015 + currentYear}/day/${dd}`);
    });
    setDayTitle(title, day, dd);
    spanDay.appendChild(title);

    if (day.hasAnimation) {
      const anim = document.createElement('div');
      anim.classList.add('click', 'animated', 'text-center');
      anim.innerText = `Animation = ${animate}`;
      anim.addEventListener('click', function () {
        animate = !animate;
        this.innerHTML = `Animation = ${animate}`;
      });
      spanDay.appendChild(anim);
    }

    const ans = document.createElement('div');
    ans.classList.add('click', 'text-center');
    ans.innerText = 'Show answers';
    ans.addEventListener('click', async function () {
      clearCode();
      const input = await getInputForDay(day, dd);
      handleAnswer(day, input);
    });
    spanDay.appendChild(ans);

    if (day.example && day.example.length) {
      const example = document.createElement('div');
      example.classList.add('click', 'text-center');
      example.innerText = 'Show example';
      example.addEventListener('click', async function () {
        clearCode();
        day.example.forEach(async function (example) {
          return await handleExample(day, example);
        });
      });
      spanDay.appendChild(example);
    }

    const showInput = document.createElement('div');
    showInput.classList.add('click', 'text-center');
    showInput.innerText = 'Show input';
    showInput.addEventListener('click', async function () {
      clearCode();
      const input = await getInputForDay(day, dd);
      logCode(input);
    });
    spanDay.appendChild(showInput);

    const custom = document.createElement('textarea');
    custom.rows = 1;
    custom.classList.add('line');
    custom.addEventListener('input', function (e) {
      cheat.classList[this.value ? 'remove' : 'add']('hidden');
    });
    spanDay.appendChild(custom);

    const cheat = document.createElement('div');
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

async function getInputForDay(day, dd) {
  if (day.input) return day.input;
  const res = await fetch(`${2015 + currentYear}/day_${dd}/input`);
  const input = await res.text();
  return input.trim();
}

function switchYear(year) {
  return () => {
    currentYear = year;
    logYears();
    logDays();
    clearCode();
  };
}
