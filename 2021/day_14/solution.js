import { safeAdd } from '../../js/december.js';

function countOccurrence(str) {
  const dict = {};
  for (let i = 0; i < str.length; i++) safeAdd(dict, str[i]);
  return dict;
}

function parse(puzzle) {
  const [axiom, abc] = puzzle.split('\n\n');
  const pairs = abc.split('\n').reduce((acc, cur) => {
    const [pair, insert] = cur.split(' -> ');
    acc[pair] = insert;
    return acc;
  }, {});
  return [axiom, pairs];
}

function insertPairs(pairs, polymer) {
  let newstr = '';
  for (let j = 0; j < polymer.length; j++) {
    newstr += polymer[j];

    const pair = `${polymer[j]}${polymer[j + 1]}`;

    if (pairs[pair]) newstr += `${pairs[pair]}`;
    else if (polymer[j + 1]) newstr += polymer[j + 1];
  }
  return newstr;
}

function solve(puzzle, num = 10) {
  let [polymer, pairs] = parse(puzzle);

  for (let i = 0; i < num; i++) {
    polymer = insertPairs(pairs, polymer);
  }
  const counts = countOccurrence(polymer);

  const values = Object.values(counts);
  const max = Math.max(...values);
  const min = Math.min(...values);

  return max - min;
}

export default {
  title: 'Extended Polymerization',
  questions: [
    'What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?',
    'What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?',
  ],
  answer1: (puzzle) => solve(puzzle),
  answer2: (puzzle) => solve(puzzle, 40),
  example: [
    {
      input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`,
      solutions: [1588, 2188189693529],
    },
  ],
  solutions: [2891],
};
