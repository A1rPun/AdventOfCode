import { safeAdd } from '../../js/december.js';

function getHighestCount(name, asc) {
  var commons = {};
  // Count all occurences in the name
  for (var i = 0; i < name.length; i++) {
    safeAdd(commons, name[i]);
  }
  // Create a most common checksum
  var mostCommons = [];
  for (var key in commons) mostCommons.push({ key: key, count: commons[key] });
  mostCommons = mostCommons.sort(
    asc
      ? function(a, b) {
          return b.count - a.count;
        }
      : function(a, b) {
          return a.count - b.count;
        }
  );
  return mostCommons[0].key;
}

function day_6(puzzle) {
  puzzle = puzzle.split('\n');
  var frequent = '';
  var lessLikely = '';
  var chunks = [];
  for (var i = puzzle.length; i--; ) {
    var code = puzzle[i];
    for (var j = code.length; j--; ) {
      var chunk = chunks[j];
      if (chunk) chunk.push(code[j]);
      else chunks[j] = [code[j]];
    }
  }
  for (var i = 0; i < chunks.length; i++) {
    frequent += getHighestCount(chunks[i], true);
    lessLikely += getHighestCount(chunks[i]);
  }
  return [frequent, lessLikely];
}

export default {
  title: 'Signals and Noise',
  questions: 'What is the error-corrected version of the message being sent?',
  answer: day_6,
  example: [
    {
      input: `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`,
      solutions: ['easter', 'advent'],
    },
  ],
  solutions: ['qqqluigu', 'lsoypmia'],
};
