export default {
  title: 'Seven Segment Search',
  questions: [
    'In the output values, how many times do digits 1, 4, 7, or 8 appear?',
    'What do you get if you add up all of the output values?',
  ],
  answer1: (puzzle) => {
    return puzzle.split('\n').reduce((acc, cur) => {
      const [, last] = cur.split(' | ');
      const count = last.split(' ').filter((x) => x.length !== 5 && x.length !== 6).length;
      return acc + count;
    });
  },
  answer2: (puzzle) => {
    return puzzle.split('\n').reduce((acc, cur) => {
      const [, last] = cur.split(' | ');
      const count = last.split(' ').filter((x) => x.length !== 5 && x.length !== 6).length;
      return acc + count;
    })
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
      solutions: [26],
    },
  ],
  solutions: [],
};
