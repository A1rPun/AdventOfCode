import { rotate, log } from '../../js/december.js';

function swap(password, x, y) {
  const result = [...password];
  [result[x], result[y]] = [result[y], result[x]];
  return result.join('');
}

function swapLetter(password, pos1, pos2) {
  const x = password.indexOf(pos1);
  const y = password.indexOf(pos2);
  return swap(password, x, y);
}

function reverse(password, x, y) {
  return [
    ...password.slice(0, x),
    ...password.slice(x, y).reverse(),
    ...password.slice(y, password.length),
  ].join('');
}

function move(password, pos1, pos2) {
  const x = password[pos1];
  const result = [...password];
  result.splice(pos1, 1);
  result.splice(pos2, 0, x);
  return result.join('');
}

const actions = {
  swap: (charArray, [type, pos1, , , pos2]) => {
    return type === 'position'
      ? swap(charArray, pos1, pos2)
      : swapLetter(charArray, pos1, pos2);
  },
  rotate: (charArray, [direction, num, , , , pos]) => {
    let theNum;

    if (direction === 'left') {
      theNum = num;
    } else if (direction === 'right') {
      theNum = -num;
    } else {
      const x = charArray.indexOf(pos);
      theNum = -(x + (+x > 3 ? 2 : 1)) % charArray.length;
    }
    return rotate(charArray, theNum).join('');
  },
  reverse: (charArray, [, pos1, , pos2]) => {
    return reverse(charArray, +pos1, +pos2 + 1);
  },
  move: (charArray, [, pos1, , , pos2]) => {
    return move(charArray, pos1, pos2);
  },
};

export function scramble(input, password) {
  const [action, ...splitted] = input.split(' ');
  const charArray = [...password];
  return actions[action](charArray, splitted);
}

export function unscramble(input, password) {
  const [action, ...splitted] = input.split(' ');
  const charArray = [...password];

  if (action === 'move') {
    const [, pos1, , , pos2] = splitted;
    return move(charArray, pos2, pos1);
  } else if (action === 'rotate') {
    const [direction, num, , , , pos] = splitted;
    let theNum;

    if (direction === 'left') {
      theNum = -num;
    } else if (direction === 'right') {
      theNum = num;
    } else {
      const x = charArray.indexOf(pos);
      theNum = x / 2 + (x % 2 === 1 || x === 0 ? 1 : 5);
    }
    return rotate(charArray, theNum).join('');
  }
  return actions[action](charArray, splitted);
}

function anim(list, callback, interval = 100) {
  let i = 0;
  return new Promise(function (resolve) {
    const fn = () => {
      const result = callback(list[i]);
      i++;
      if (i < list.length) {
        setTimeout(fn, interval);
      } else {
        resolve(result);
      }
    };
    setTimeout(fn, interval);
  });
}

function answer(lines, answer1, theFn, animate) {
  if (animate) {
    return anim(lines, (line) => {
      answer1 = theFn(line, answer1);
      log(answer1, true);
      return answer1;
    });
  } else {
    for (let i = 0; i < lines.length; i++) {
      answer1 = theFn(lines[i], answer1);
    }
    return answer1;
  }
}

export default {
  title: 'Scrambled Letters and Hash',
  questions: [
    'Now, you just need to generate a new scrambled password and you can access the system. What is the result of scrambling abcdefgh?',
    'What is the un-scrambled version of the scrambled password fbgdceah?',
  ],
  answer1: (puzzle, animate) => {
    const [start, input] = puzzle.split('\n\n');
    const lines = input.split('\n');
    return answer(lines, start !== 'abcde' ? 'abcdefgh' : start, scramble, animate);
  },
  answer2: (puzzle, animate) => {
    const [start, input] = puzzle.split('\n\n');
    const lines = input.split('\n').reverse();
    return answer(lines, start, unscramble, animate);
  },
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
      input: `decab

swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`,
      solutions: [, 'abcde'],
    },
  ],
  solutions: ['agcebfdh', 'afhdbegc'],
  hasAnimation: true,
};
