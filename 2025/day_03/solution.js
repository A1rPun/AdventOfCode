function getJoltage(bank, length = 2) {
  let joltage = '';
  let highestIndex = -1;
  let highest = 0;

  for (let i = 0; i < length; i++) {
    [highest, highestIndex] = getNextLargest(bank, highestIndex + 1, -length + 1 + i);
    joltage += highest;
  }
  return +joltage;
}

function getNextLargest(bank, start = 0, end = 0) {
  let highest = 0;
  let highestIndex = -1;

  for (let i = start; i < bank.length + end; i++) {
    const num = +bank[i];

    if (num > highest) {
      highest = num;
      highestIndex = i;

      if (num === 9) break;
    }
  }
  return [highest, highestIndex];
}

export default {
  title: 'Lobby',
  questions: [
    'What is the total output joltage?',
    'What is the new total output joltage?',
  ],
  answer1: (puzzle) => {
    const banks = puzzle.split('\n');
    const answer = banks.reduce((acc, cur) => {
      return acc + getJoltage(cur);
    }, 0);
    return answer;
  },
  answer2: (puzzle) => {
    const banks = puzzle.split('\n');
    const answer = banks.reduce((acc, cur) => {
      return acc + getJoltage(cur, 12);
    }, 0);
    return answer;
  },
  example: [
    {
      input: `987654321111111
811111111111119
234234234234278
818181911112111`,
      solutions: [357, 3121910778619],
    },
  ],
  solutions: [17278, 171528556468625],
};
