import assembunny from '../shared/assembunny.js';

function toggleLine(collection, index) {
  let [opCode, ...args] = collection[index].split(' ');

  if (args.length > 1) {
    opCode = opCode === 'jnz' ? 'cpy' : 'jnz';
  } else {
    opCode = opCode === 'inc' ? 'dec' : 'inc';
  }
  collection[index] = [opCode, ...args].join(' ');
  return collection;
}

function answer(lines, registerA) {
  const interpreter = new assembunny({ a: registerA });

  for (let i = 0; i < lines.length; ) {
    const [opCode, ...args] = lines[i].split(' ');

    if (opCode === 'tgl') {
      const index = i + interpreter.get(args[0]);

      if (index < lines.length) {
        lines = toggleLine(lines, index);
      }
      i++;
    } else {
      i += interpreter[opCode](...args);
    }
  }
  return interpreter.get('a');
}

export default {
  title: 'Safe Cracking',
  questions: [
    'What value should be sent to the safe?',
    'Anyway, what value should actually be sent to the safe?',
  ],
  answer1: (puzzle) => answer(puzzle.split('\n'), 7),
  answer2: (puzzle) => {
    const lines = puzzle.split('\n');
    const replacer = `mul b d a${'\njnz 0'.repeat(5)}`.split('\n');
    lines.splice(4, 6, ...replacer);
    return answer(lines, 12);
  },
  example: [
    {
      input: `cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`,
      solutions: [3, 3],
    },
  ],
  solutions: [13468, 479010028],
};
