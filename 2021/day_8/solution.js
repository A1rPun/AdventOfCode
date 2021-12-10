import { toInt } from '../../js/december.js';

function find1478(digit) {
  return digit.length !== 5 && digit.length !== 6;
}

function getNumber(digit, mapping) {
  if (digit.length === 2) return 1;
  if (digit.length === 3) return 7;
  if (digit.length === 4) return 4;
  if (digit.length === 5) return find5Length(digit, mapping);
  if (digit.length === 6) return find6Length(digit, mapping);
  if (digit.length === 7) return 8;
  return 0;
}

function find5Length(digit, mapping, letter2 = 'g', letter5 = 'e') {
  if (digit.includes(letter2)) return 2;
  return digit.includes(letter5) ? 5 : 3;
}

function find6Length(digit, mapping, letter6 = 'a', letter0 = 'f') {
  if (!digit.includes(letter6)) return 6;
  return !digit.includes(letter0) ? 0 : 9;
}

export default {
  title: 'Seven Segment Search',
  questions: [
    'In the output values, how many times do digits 1, 4, 7, or 8 appear?',
    'What do you get if you add up all of the output values?',
  ],
  answer1: (puzzle) => {
    return puzzle.split('\n').reduce((acc, cur) => {
      const [, tail] = cur.split(' | ');
      const count = tail.split(' ').filter(find1478).length;
      return acc + count;
    }, 0);
  },
  answer2: (puzzle) => {
    return puzzle.split('\n').reduce((acc, cur) => {
      const [head, tail] = cur.split(' | ');
      const numbers = tail.split(' ').map((x) => getNumber(x, head));
      return acc + toInt(numbers.join(''));
    }, 0);
  },
  example: [
    {
      input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
      solutions: [26, 61229],
    },
    {
      input: `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`,
      solutions: [0, 5353],
    },
  ],
  solutions: [390],
};
