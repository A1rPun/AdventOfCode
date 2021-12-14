import { safeAdd } from '../../js/december.js';

function countOccurrence(str) {
  const dict = {};
  for (let i = 0; i < str.length; i++)
    safeAdd(dict, str[i]);
  return dict;
}

export default {
  title: 'Extended Polymerization',
  questions: [
    'What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?',
    '',
  ],
  answer1: (puzzle) => {
    const [axiom, pairs] = puzzle.split('\n\n');
    const dict = pairs.split('\n').reduce((acc, cur) => {
      const [pair, insert] = cur.split(' -> ')
      acc[pair] = insert;
      return acc;
    }, {});

    let polymer = axiom;

    for (let i = 0; i < 10; i++) {
      let newstr = '';
      for (let j = 0; j < polymer.length; j++) {
        newstr += polymer[j];

        const pair = `${polymer[j]}${polymer[j+1]}`;
        
        if (dict[pair])
          newstr += `${dict[pair]}`;
        else if (polymer[j + 1]) {
          newstr += polymer[j + 1];
        }
      }
      polymer = newstr;
    }   


    const counts = countOccurrence(polymer);

    return counts;
  },
  answer2: (puzzle) => {
    const [axiom, pairs] = puzzle.split('\n\n');
    const dict = pairs.split('\n').reduce((acc, cur) => {
      const [pair, insert] = cur.split(' -> ')
      acc[pair] = insert;
      return acc;
    }, {});

    let polymer = axiom;

    for (let i = 0; i < 40; i++) {
      let newstr = '';
      for (let j = 0; j < polymer.length; j++) {
        newstr += polymer[j];

        const pair = `${polymer[j]}${polymer[j+1]}`;
        
        if (dict[pair])
          newstr += `${dict[pair]}`;
        else if (polymer[j + 1]) {
          newstr += polymer[j + 1];
        }
      }
      polymer = newstr;
    }   


    const counts = countOccurrence(polymer);

    return counts;
  },
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
      solutions: [1588],
    },
  ],
  solutions: [],
};
