(function() {
  function iJustGoLinearForAnswer2(entries) {
    for (let i = 0; i < entries.length; i++) {
      for (let j = 0; j < entries.length; j++) {
        if (i === j) continue;
        for (let k = 0; k < entries.length; k++) {
          if (i === k || j === k) continue;
          if (entries[i] + entries[j] + entries[k] === 2020)
            return entries[i] * entries[j] * entries[k];
        }
      }
    }
  }

  function superbSolutionForThisDay(entries, amountOfEntriesThatContributeTo2020) {
    // TODO: Implement ;)
  }

  December.addDay({
    day: 1,
    year: 2020,
    title: 'Report Repair',
    questions: [
      'Find the two entries that sum to 2020; what do you get if you multiply them together?',
      'In your expense report, what is the product of the three entries that sum to 2020?',
    ],
    answer1: (puzzle) => {
      const entries = puzzle.split('\n').map(December.toInt);
      const answer = entries.reduce((acc, cur, i) => {
        const entry = entries.find((x, j) => i !== j && x + cur === 2020);
        return entry ? cur * entry : acc;
      }, 0);
      return answer;
    },
    answer2: (puzzle) => {
      const entries = puzzle.split('\n').map(December.toInt);
      return iJustGoLinearForAnswer2(entries);
    },
    example: [
      {
        input: `1721
979
366
299
675
1456`,
        solutions: [514579, 241861950],
      },
    ],
    solutions: [138379, 85491920],
  });
})();
