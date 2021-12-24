#!/usr/bin/env node
import fs from 'fs';
import years from './module.js';

let day, year, exampleN;
main();

async function handleAnswer(answer, input) {
  return await Promise.resolve(answer(input, false));
}

async function main() {
  if (!process?.argv?.[2]) {
    console.log('Usage: $ ./testday.js day year? exampleN?');
    return;
  }

  year = process?.argv?.[3] ?? 2021;
  day = process.argv[2] ?? 13;
  const x = years[year - 2015][day - 1];
  exampleN = process?.argv?.[4];
  await getAnswer(x);
  console.log('Test complete');
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
    console.time('Answer 1');
    const a1 = await handleAnswer(x.answer1, input);
    console.timeEnd('Answer 1');
    console.log(a1 === s1 ? 'Perfect' : 'Hopeful');
    console.log(a1);
    console.log(s1);
  }

  if (x.answer2) {
    console.log(`Year: ${year}, Day ${day}, Answer 2`);
    console.time('Answer 2');
    const a2 = await handleAnswer(x.answer2, input);
    console.timeEnd('Answer 2');
    console.log(a2 === s2 ? 'Perfect' : 'Hopeful');
    console.log(a2);
    console.log(s2);
  }

  if (x.answer) { 
    console.log(`Year: ${year}, Day ${day}, Answer 1 & 2`);
    console.time('Answer 1 & 2');
    const [a1, a2] = await handleAnswer(x.answer, input);
    console.timeEnd('Answer 1 & 2');
    console.log(a1 === s1 ? 'Perfect' : 'Hopeful');
    console.log(a1);
    console.log(s1);
    console.log(a2 === s2 ? 'Perfect' : 'Hopeful');
    console.log(a2);
    console.log(s2);
  }
}
