#!/usr/bin/env node
import fs from 'fs';
import years from './module.js';
import { setSink } from './js/december.js';

let day, year, exampleN;
setSink(() => {});
main();

async function handleAnswer(answer, input) {
  return await Promise.resolve(answer(input, false));
}

function main() {
  if (!process?.argv?.[2]) {
    console.log('Usage: $ ./testday.js day year? exampleN?');
    return;
  }

  year = process?.argv?.[3] ?? 2021;
  day = process.argv[2] ?? 13;
  const x = years[year - 2015][day - 1];
  exampleN = process?.argv?.[4];
  getAnswer(x);
}

function getInputForDay(x) {
  if (exampleN) return x.example[exampleN].input;
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
  if (!x.title) {
    return;
  }

  const input = getInputForDay(x);
  const [s1, s2] = exampleN ? x.example[exampleN].solutions : x.solutions;

  if (x.answer1) {
    console.log(`Year: ${year}, Day ${day}, Answer 1`);
    const a1 = await handleAnswer(x.answer1, input);
    console.log(a1 === s1 ? 'Perfect' : 'Hopeful');
    console.log(a1);
  }

  if (x.answer2) {
    console.log(`Year: ${year}, Day ${day}, Answer 2`);
    const a2 = await handleAnswer(x.answer2, input);
    console.log(a2 === s2 ? 'Perfect' : 'Hopeful');
    console.log(a2);
  }

  if (x.answer) { 
    console.log(`Year: ${year}, Day ${day}, Answer 1 & 2`);
    const [a1, a2] = await handleAnswer(x.answer, input);
    console.log(a1 === s1 ? 'Perfect' : 'Hopeful');
    console.log(a1);
    console.log(a2 === s2 ? 'Perfect' : 'Hopeful');
    console.log(a2);
  }
}
