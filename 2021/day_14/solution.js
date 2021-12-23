import { safeAdd } from '../../js/december.js';

function solve(puzzle, steps = 10) {
  const [template, pairs] = parse(puzzle);
  const pairCounts = createEmptyObject(pairs);

  init(pairCounts, template);
  grow(pairCounts, pairs, steps);

  return getQuantity(pairCounts);
}

function parse(puzzle) {
  const [axiom, mapping] = puzzle.split('\n\n');
  const pairs = mapping.split('\n').reduce((acc, cur) => {
    const [pair, insert] = cur.split(' -> ');
    acc[pair] = insert;
    return acc;
  }, {});
  return [axiom, pairs];
}

function createEmptyObject(obj) {
  const result = {};
  for (const key in obj) result[key] = 0;
  return result;
}

function init(pairCounts, template) {
  for (let i = 0; i < template.length - 1; i++) {
    pairCounts[template[i] + template[i + 1]]++;
  }
}

function grow(pairCounts, pairs, steps) {
  while (steps--) {
    const counts = { ...pairCounts };

    for (const pair in pairs) {
      const [a, b] = pair;
      const pairCount = counts[pair];
      pairCounts[pair] -= pairCount;
      pairCounts[a + pairs[pair]] += pairCount;
      pairCounts[pairs[pair] + b] += pairCount;
    }
  }
}

function getQuantity(pairCounts) {
  const counts = {};

  for (const [[a, b], count] of Object.entries(pairCounts)) {
    safeAdd(counts, a, count);
    safeAdd(counts, b, count);
  }

  const nums = Object.values(counts);
  const max = Math.round(Math.max(...nums) / 2);
  const min = Math.round(Math.min(...nums) / 2);

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
  solutions: [2891, 4607749009683],
};
