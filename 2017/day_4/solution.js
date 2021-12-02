function checkWords(words) {
  for (var i = 0; i < words.length - 1; i++)
    if (words[i] === words[i + 1]) return false;
  return true;
}
function day_4(puzzle) {
  puzzle = puzzle.split('\n');
  var answer1 = puzzle.filter(function(phrase) {
    return checkWords(phrase.split(' ').sort());
  }).length;

  var answer2 = puzzle.filter(function(phrase) {
    var words = phrase
      .split(' ')
      .map(function(word) {
        return word
          .split('')
          .sort()
          .join('');
      })
      .sort();
    return checkWords(words);
  }).length;

  return [answer1, answer2];
}
export default {
  title: 'High-Entropy Passphrases',
  questions: 'How many passphrases are valid?',
  answer: day_4,
  example: [
    `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`,
  ],
};
