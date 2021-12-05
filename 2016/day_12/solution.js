import assembunny from '../shared/assembunny.js';

function day_12(puzzle) {
  const lines = puzzle.split('\n');
  const interpreter = new assembunny({ c: 1 });

  for (var i = 0; i < lines.length; ) {
    const [opCode, ...args] = lines[i].split(' ');
    i += interpreter[opCode](...args);
  }
  return interpreter.get('a');
}

export default {
  title: "Leonardo's Monorail",
  questions: [
    'After executing the assembunny code in your puzzle input, what value is left in register a?',
    'If you instead initialize register c to be 1, what value is now left in register a?',
  ],
  answer2: day_12,
  example: [
    {
      input: `cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`,
      solutions: [, 42],
    },
  ],
  solutions: [318077, 9227731],
};
