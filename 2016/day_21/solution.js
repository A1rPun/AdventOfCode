import { rotate, log } from '../../js/december.js';

const actions = {
  swap: function (charArr, split) {
    let result = [...charArr];

    if (split[1] === 'position') {
      result[split[2]] = [
        result[split[5]],
        (result[split[5]] = result[split[2]]),
      ][0];
    } else {
      var x = result.indexOf(split[2]);
      var y = result.indexOf(split[5]);
      result[x] = [result[y], (result[y] = result[x])][0];
    }
    return result;
  },
  rotate: function (charArr, split) {
    let result;

    if (split[1] === 'left') {
      result = rotate(charArr, split[2]);
    } else if (split[1] === 'right') {
      result = rotate(charArr, -split[2]);
    } else {
      var x = charArr.indexOf(split[6]);
      result = rotate(charArr, -(1 + x + (+x > 3 ? 1 : 0)) % charArr.length);
    }
    return result;
  },
  reverse: function (charArr, split) {
    var x = +split[2];
    var y = +split[4] + 1;
    var a = charArr.slice(0, x);
    var b = charArr.slice(x, y).reverse();
    var c = charArr.slice(y, charArr.length);
    return a.concat(b).concat(c);
  },
  move: function (charArr, split) {
    let result = [...charArr];
    const x = result[split[2]];
    result.splice(split[2], 1);
    result.splice(split[5], 0, x);
    return result;
  },
};

function processInput(input, charArr) {
  var splitted = input.split(' ');
  return actions[splitted[0]](charArr, splitted);
}

function day_21(puzzle, animate) {
  const [start, input] = puzzle.split('\n\n');
  const lines = input.split('\n');
  let answer1 = start;

  return new Promise(function (resolve) {
    let i = 0;

    if (animate) {
      const interval = 100;
      const fn = () => {
        answer1 = processInput(lines[i], answer1);
        i++;
        if (i < lines.length) {
          log(answer1.join(''), true);
          setTimeout(fn, interval);
        } else resolve(answer1.join(''));
      };
      setTimeout(fn, interval);
    } else {
      for (; i < lines.length; i++) {
        answer1 = processInput(lines[i], answer1);
      }
      resolve(answer1.join(''));
    }
  });
}

export default {
  title: 'Scrambled Letters and Hash',
  questions: [
    'Now, you just need to generate a new scrambled password and you can access the system. What is the result of scrambling abcdefgh?',
    'What is the un-scrambled version of the scrambled password fbgdceah?',
  ],
  answer1: day_21,
  answer2: (puzzle) => '',
  example: [
    {
      input: `abcde

swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`,
      solutions: ['decab'],
    },
    {
      input: 'fbgdceah',
      solutions: [, ''],
    }
  ],
  solutions: ['agcebfdh'],
  hasAnimation: true,
};
