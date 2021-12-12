const endings = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const starts = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

const chunks = ['()', '[]', '{}', '<>'];

function findIllegal(line) {
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    const x = line[i];

    if (endings[x]) {
      const last = stack.pop();
      if (!chunks.find((y) => y === last + x)) return x;
    } else {
      stack.push(x);
    }
  }
}

function autoComplete(line) {
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    const x = line[i];

    if (endings[x]) {
      stack.pop();
    } else {
      stack.push(x);
    }
  }
  return stack.reverse();
}

function getScore(completion) {
  return completion.reduce((a, b) => a * 5 + starts[b], 0);
}

export default {
  title: 'Syntax Scoring',
  questions: [
    'What is the total syntax error score for those errors?',
    'What is the middle score?',
  ],
  answer1: (puzzle) => {
    const illegalChars = puzzle
      .split('\n')
      .map(findIllegal)
      .filter((x) => x);

    return illegalChars.reduce((a, b) => a + endings[b], 0);
  },
  answer2: (puzzle) => {
    const scores = puzzle
      .split('\n')
      .filter((x) => !findIllegal(x))
      .map(autoComplete)
      .map(getScore)
      .sort((a, b) => a < b);

    return scores[(scores.length / 2) | 0];
  },
  example: [
    {
      input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
      solutions: [26397, 288957],
    },
  ],
  solutions: [240123, 3260812321],
};
