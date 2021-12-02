var actions = {
  swap: function(charArr, split) {
    if (split[1] === 'position') {
      charArr[split[2]] = [
        charArr[split[5]],
        (charArr[split[5]] = charArr[split[2]]),
      ][0];
    } else {
      var x = charArr.indexOf(split[2]);
      var y = charArr.indexOf(split[5]);
      charArr[x] = [charArr[y], (charArr[y] = charArr[x])][0];
    }
    return charArr;
  },
  rotate: function(charArr, split) {
    if (split[1] === 'left') {
      charArr = December.rotate(charArr, split[2]);
    } else if (split[1] === 'right') {
      charArr = December.rotate(charArr, -split[2]);
    } else {
      var x = charArr.indexOf(split[6]);
      charArr = December.rotate(
        charArr,
        -(1 + x + (+x > 3 ? 1 : 0)) % charArr.length
      );
    }
    return charArr;
  },
  reverse: function(charArr, split) {
    var x = +split[2];
    var y = +split[4] + 1;
    var a = charArr.slice(0, x);
    var b = charArr.slice(x, y).reverse();
    var c = charArr.slice(y, charArr.length);
    return a.concat(b).concat(c);
  },
  move: function(charArr, split) {
    var x = charArr[split[2]];
    charArr.splice(split[2], 1);
    charArr.splice(split[5], 0, x);
    return charArr;
  },
};

function processInput(input, charArr) {
  var splitted = input.split(' ');
  return actions[splitted[0]](charArr, splitted);
}

function day_21(puzzle) {
  const animate = December.animate;
  puzzle = puzzle.split('\n');
  var answer1 = 'abcdefgh';
  return new Promise(function(resolve) {
    if (animate) {
      var interval = 100;
      var i = 0;
      var fn = function() {
        answer1 = processInput(puzzle[i], answer1);
        i++;
        if (i < puzzle.length) {
          December.log(answer1.join(''), true);
          setTimeout(fn, interval);
        } else resolve(answer1.join(''));
      };
      setTimeout(fn, interval);
    } else {
      for (var i = 0; i < puzzle.length; i++)
        answer1 = processInput(puzzle[i], answer1);
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
  answer: day_21,
  example: [
    `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`,
  ],
  solutions: ['agcebfdh'],
};
