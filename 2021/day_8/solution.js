import { toInt } from '../../js/december.js';

const digit1Length = 2;
const digit4Length = 4;
const digit7Length = 3;

function find1478(digit) {
  return digit.length !== 5 && digit.length !== 6;
}

function getNumber(digit, mapping) {
  if (digit.length === digit1Length) return 1;
  if (digit.length === digit7Length) return 7;
  if (digit.length === digit4Length) return 4;
  if (digit.length === 5) return find5Length(digit, mapping);
  if (digit.length === 6) return find6Length(digit, mapping);
  return 8;
}

function find5Length(digit, mapping) {
  const splitted = mapping.split(' ');

  const digit1 = splitted.find(x => x.length === digit1Length);
  if (deepIncludes(digit1, digit)) return 3;

  const digit4 = splitted.find(x => x.length === digit4Length);
  return deepIncludesCount(digit4, digit) === 3 ? 5 : 2;
}

function find6Length(digit, mapping) {
  const splitted = mapping.split(' ');

  const digit4 = splitted.find(x => x.length === digit4Length);
  if (deepIncludes(digit4, digit)) return 9;

  const digit1 = splitted.find(x => x.length === digit1Length);
  return deepIncludes(digit1, digit) ? 0 : 6;
}

function deepIncludes(needle, haystack) {
  return needle.split('').every((x) => haystack.includes(x));
}

function deepIncludesCount(needle, haystack) {
  return needle.split('').filter((x) => haystack.includes(x)).length;
}

export default {
  title: 'Seven Segment Search',
  questions: [
    'In the output values, how many times do digits 1, 4, 7, or 8 appear?',
    'What do you get if you add up all of the output values?',
  ],
  answer1: (puzzle) => {
    return puzzle.split('\n').reduce((acc, cur) => {
      const [, output] = cur.split(' | ');
      const count = output.split(' ').filter(find1478).length;
      return acc + count;
    }, 0);
  },
  answer2: (puzzle) => {
    return puzzle.split('\n').reduce((acc, cur) => {
      const [signals, output] = cur.split(' | ');
      const outputValues = output.split(' ').map((x) => getNumber(x, signals));
      return acc + toInt(outputValues.join(''));
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
  solutions: [390, 1011785],
};
