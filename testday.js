import fs from 'fs';
import years from './module.js';
import { setSink } from './js/december.js';

setSink(() => {});

const year = 2021;
const day = process?.argv?.[2] ?? 9;
const x = years[year - 2015][day - 1];
getAnswer(x);

async function handleAnswer(answer, input) {
  return await Promise.resolve(answer(input, false));
}

function getInputForDay(x) {
  if (x.input) return x.input;

  try {
    const fileName = `${year}/day_${day.toString().padStart(2, '0')}/input`;
    const data = fs.readFileSync(fileName, 'utf8');
    return data.trim();
  } catch (err) {
    console.error(err);
  }
}

async function getAnswer(x) {
  if (!x.title || !x.solutions?.length) {
    return;
  }

  const input = getInputForDay(x);
  const [s1, s2] = x.solutions;

  if (x.answer1 && s1 !== undefined) {
    console.log(`Year: ${year}, Day ${day}, Answer 1`);
    const a1 = await handleAnswer(x.answer1, input);
    console.log(a1 === s1 ? 'Perfect' : 'Hopeful');
  }

  if (x.answer2 && s2 !== undefined) {
    console.log(`Year: ${year}, Day ${day}, Answer 2`);
    const a2 = await handleAnswer(x.answer2, input);
    console.log(a2 === s2 ? 'Perfect' : 'Hopeful');
  }
}
