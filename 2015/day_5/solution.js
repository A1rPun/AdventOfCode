var vowels = ['a', 'e', 'i', 'o', 'u'];
var avoid = ['ab', 'cd', 'pq', 'xy'];
function naughtOrNice1(string) {
  var vowelCount = 0;
  var duplicate = false;
  var avoided = true;
  var lastChar = '';
  for (var j = 0; j < string.length; j++) {
    var char = string[j];
    if (~vowels.indexOf(char)) vowelCount++;
    if (lastChar === char) duplicate = true;
    if (~avoid.indexOf(lastChar + char)) avoided = false;
    lastChar = char;
  }
  return vowelCount > 2 && duplicate && avoided;
}
function naughtOrNice2(string) {
  var pairs = {};
  var hasMultiplePairs = false;
  var between = false;
  for (var j = 0, l = string.length; j < l; j++) {
    if (
      j < l - 1 &&
      (string[j] + string[j + 1] !== string[j + 1] + string[j + 2] ||
        string[j] === string[j + 3])
    ) {
      var pair = string[j] + string[j + 1];
      if (!pairs[pair]) pairs[pair] = 0;
      pairs[pair]++;
      if (pairs[pair] > 1) {
        console.log(string, pair);
        hasMultiplePairs = true;
      }
    }
    if (j < l - 2 && string[j] === string[j + 2]) between = true;
  }
  return hasMultiplePairs && between;
}
function day_5(puzzle) {
  puzzle = puzzle.split('\n');
  var answer1 = 0;
  var answer2 = 0;
  for (var i = 0; i < puzzle.length; i++) {
    var string = puzzle[i];
    if (naughtOrNice1(string)) answer1++;
    if (naughtOrNice2(string)) answer2++;
  }
  return [answer1, answer2];
}
export default {
  title: "Doesn't He Have Intern- Elves For This?",
  questions: [
    'How many strings are nice?',
    'How many strings are nice under these new rules?',
  ],
  answer: day_5,
  example: [
    `qjhvhtzxzqqjkmpb
xxyxx
uurcxstgmygtbstg
ieodomkazucvgmuy
bmztllsugzsqefrm
ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb`,
  ],
  exampleSolutions: [2, 2],
  solutions: [236, 51],
};
