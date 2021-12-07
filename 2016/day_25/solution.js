import assembunny from '../shared/assembunny.js';

function solve(puzzle) {
  const lines = puzzle.split('\n');
  const interpreter = new assembunny({ c: 1 });

  for (var i = 0; i < lines.length; ) {
    const [opCode, ...args] = lines[i].split(' ');
    i += interpreter[opCode](...args);
  }
  return interpreter.get('a');
}

export default {
  title: 'Clock Signal',
  questions: [
    'What is the lowest positive integer that can be used?',
    ''
  ],
  answer1: (puzzle) => solve(puzzle),
  answer2: (puzzle) => {},
  example: [
    {
      input: '',
      solutions: [],
    },
  ],
  solutions: [],
};
