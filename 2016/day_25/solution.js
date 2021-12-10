import assembunny from '../shared/assembunny.js';

// check() {
//   const [first] = this.values;

//   for (let i = 1; i < this.values; i++) {
//     if (first === this.values[i]) {
//       return false;
//     }
//   }
//   return true;
// }

function solve(puzzle) {
  const lines = puzzle.split('\n');
  const interpreter = new assembunny({ a: 10 });

  for (var i = 0; i < lines.length; ) {
    const [opCode, ...args] = lines[i].split(' ');
    i += interpreter[opCode](...args);

    if (interpreter.values.length > 5 && interpreter.check()) {
      break;
    }
  }
  return interpreter.get('a');
}

export default {
  title: 'Clock Signal',
  questions: ['What is the lowest positive integer that can be used?', ''],
  answer1: (puzzle) => solve(puzzle),
  answer2: (puzzle) => 50,
  solutions: [],
};
