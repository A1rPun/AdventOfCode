function rotate(pattern) {
  const length = Math.sqrt(pattern.length);
  return pattern.reduce((acc, curr, i) => {
    acc[(i % length) * length + (length - Math.floor(i / length) - 1)] = curr;
    return acc;
  }, []);
}

function flip(pattern) {
  const length = Math.sqrt(pattern.length);
  return pattern.reduce((acc, curr, i) => {
    acc[(Math.floor(i / length) + 1) * length - 1 - (i % length)] = curr;
    return acc;
  }, []);
}

function parsePattern(acc, curr) {
  //TODO: in one regex?
  let [patternInput, transformInput] = curr.split(' => ');
  const pattern = patternInput.match(/#|\./g);
  const transform = transformInput.match(/#|\./g);
  return [pattern, rotate(pattern)].reduce((acc, curr) => {
    return [curr, flip(curr)].reduce((acc, curr) => {
      acc[curr.join('')] = transform;
      acc[curr.reverse().join('')] = transform;
      return acc;
    }, acc);
  }, acc);
}

function divide(fractal) {
  const length = Math.sqrt(fractal.length);
  const size = length % 2 === 0 ? 2 : 3;
  return fractal.reduce((acc, curr, i) => {
    const index =
      Math.floor(i / (length * size)) * (length / size) +
      Math.floor((i % length) / size);
    if (!acc[index]) acc[index] = [];
    acc[index].push(curr);
    return acc;
  }, []);
}

function reunite(ruled) {
  const length = Math.sqrt(ruled.length * ruled[0].length);
  const size = Math.sqrt(ruled[0].length);
  const beacon = length / size;
  return ruled.reduce((acc, curr, idx) => {
    return curr.reduce((acc, curr, i) => {
      const index =
        Math.floor(i / size) * length +
        (i % size) +
        Math.floor(idx / beacon) * (length * beacon) +
        idx * size;
      acc[index] = curr;
      return acc;
    }, acc);
  }, []);
}

function day_21(puzzle) {
  const patterns = puzzle.split('\n').reduce(parsePattern, {});
  let fractal = '.#...####'.split('');
  let iterations = 5;
  while (iterations--) {
    const divided = divide(fractal);
    const ruled = divided.map((x) => patterns[x.join('')]);
    fractal = reunite(ruled).filter((x) => x); // TODO Fix reunite indexing (9x2 vs 9x3) so that the filter isn't needed
  }
  December.log(prettify(fractal));
  const answer1 = December.count(fractal.join(''), '#');
  return answer1;
}
export default {
  title: 'Fractal Art',
  questions: 'How many pixels stay on after 5 iterations?',
  answer: day_21,
  example: ['../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#'],
};

function prettify(fractal) {
  const size = Math.sqrt(fractal.length);
  const pretty = [];
  for (var i = 0; i < fractal.length; i += size) {
    pretty.push(fractal.slice(i, i + size).join(''));
  }
  return pretty.join('\n');
}

/* /
Original
.#.
..#
###
Reversed
###
#..
.#.
Flipped X
.#.
#..
###
FlippedReversed
###
..#
.#.

Rotated 90
#..
#.#
##.
Reversed
.##
#.#
..#
Flipped X
..#
#.#
.##
FlippedReversed
##.
#.#
#..
/* */
