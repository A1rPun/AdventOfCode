import December from '../../js/december.js';

var actions = {
  rect: {
    txt: 'e',
    index: 1,
    slice: 5,
    process: function (strip, input) {
      var point = input.slice(this.slice).split('x');
      var x = point[0];
      var y = point[1];
      // TODO: bounds check?
      for (var i = 0; i < y; i++) {
        for (var j = 0; j < x; j++) {
          strip[i][j] = '#';
        }
      }
    },
  },
  rotateRow: {
    txt: 'r',
    index: 7,
    slice: 13,
    process: function (strip, input) {
      var point = input.slice(this.slice).split(' by ');
      strip[point[0]] = December.rotate(strip[point[0]], -point[1]);
    },
  },
  rotateColumn: {
    txt: 'c',
    index: 7,
    slice: 16,
    process: function (strip, input) {
      var point = input.slice(this.slice).split(' by ');
      var x = point[0];
      var y = point[1];
      var arr = [];
      for (var i = 0; i < strip.length; i++) arr.push(strip[i][x]);
      arr = December.rotate(arr, -y);
      for (var i = 0; i < strip.length; i++) strip[i][x] = arr[i];
    },
  },
};

function getStrip(width, height) {
  var strip = [];
  for (var i = height; i--; ) {
    strip[i] = [];
    for (var j = width; j--; ) {
      strip[i][j] = '.';
    }
  }
  return strip;
}

function processInput(input, strip) {
  for (var action in actions) {
    var a = actions[action];
    if (input[a.index] === a.txt) {
      a.process(strip, input);
    }
  }
}

function day_8(puzzle, animate) {
  var inputs = puzzle.split('\n');
  var strip = getStrip(50, 6);
  return new Promise(function (resolve) {
    if (animate) {
      var interval = 50;
      var i = 0;
      var fn = function () {
        processInput(inputs[i], strip);
        December.log(December.prettify(strip), true);
        i++;
        if (i < inputs.length) setTimeout(fn, interval);
        else
          resolve([
            December.count(December.prettify(strip), '#'),
            December.prettify(strip),
          ]);
      };
      setTimeout(fn, interval);
    } else {
      for (var i = 0; i < inputs.length; i++) processInput(inputs[i], strip);
      resolve([
        December.count(December.prettify(strip), '#'),
        December.prettify(strip),
      ]);
    }
  });
}

export default {
  title: 'Two-Factor Authentication',
  questions: [
    'If the screen did work, how many pixels should be lit?',
    'What code is the screen trying to display?',
  ],
  answer: day_8,
  solutions: [
    121,
    `###..#..#.###..#..#..##..####..##..####..###.#....
#..#.#..#.#..#.#..#.#..#.#....#..#.#......#..#....
#..#.#..#.#..#.#..#.#....###..#..#.###....#..#....
###..#..#.###..#..#.#....#....#..#.#......#..#....
#.#..#..#.#.#..#..#.#..#.#....#..#.#......#..#....
#..#..##..#..#..##...##..####..##..####..###.####.`,
  ],
  hasAnimation: true,
};
