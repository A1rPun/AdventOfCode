function countCharacters(str) {
  const characters = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    characters[char] = (characters[char] || 0) + 1;
  }
  return characters;
}

function countYesAnswers(puzzle) {
  return puzzle
    .split('\n\n')
    .map((x) => x.replace(/\n/g, ''))
    .reduce((acc, cur) => acc + Object.keys(countCharacters(cur)).length, 0);
}

function countYesForAllAnswers(puzzle) {
  return puzzle
    .split('\n\n')
    .filter((x) => x)
    .reduce((acc, cur) => {
      const amountOfPeople = cur.split('\n').length;
      const answerCount = countCharacters(cur.replace(/\n/g, ''));
      const yesForAllCount = Object.values(answerCount).filter(
        (x) => x === amountOfPeople
      ).length;
      return acc + yesForAllCount;
    }, 0);
}

export default {
  title: 'Custom Customs',
  questions: [
    'What is the sum of those counts?',
    'What is the sum of those counts?',
  ],
  answer1: (puzzle) => countYesAnswers(puzzle),
  answer2: (puzzle) => countYesForAllAnswers(puzzle),
  example: [
    {
      input: `abc

a
b
c

ab
ac

a
a
a
a

b`,
      solutions: [11, 6],
    },
  ],
  solutions: [6947, 3398],
};
