(function() {
  function day_7(puzzle) {
    const test = false;
    const minSeconds = test ? 64 : 4;
    const workers = test ? 2 : 5;

    const steps = puzzle
      .split('\n')
      .map(x => x.match(/[A-Z]/g))
      .reduce((acc, curr) => {
        let [, beforeStep, step] = curr;
        if (!acc[beforeStep])
          acc[beforeStep] = {
            letter: beforeStep,
            dependsOn: [],
            seconds: beforeStep.charCodeAt(0) - minSeconds,
          };

        if (acc[step]) acc[step].dependsOn.push(beforeStep);
        else
          acc[step] = {
            letter: step,
            dependsOn: [beforeStep],
            seconds: step.charCodeAt(0) - minSeconds,
          };
        return acc;
      }, {});

    let starters = Object.values(steps)
      .filter(x => !x.dependsOn.length)
      .map(x => x.letter);
    let answer1 = '';
    let answer2 = 0;
    while (starters.length) {
      let loop = Math.min(starters.length, workers);
      for (let i = loop; i--; ) {
        const nextLetter = starters[i];
        const nextStep = steps[nextLetter];
        if (--nextStep.seconds === 0) {
          answer1 += nextLetter;
          starters.splice(i, 1);
          for (const key in steps) {
            const step = steps[key];
            const nextLetterIndex = step.dependsOn.indexOf(nextLetter);
            if (~nextLetterIndex) {
              step.dependsOn.splice(nextLetterIndex, 1);
              if (!step.dependsOn.length) {
                starters.push(step.letter);
              }
            }
          }
        }
      }
      answer2++;
    }
    return Promise.resolve([answer1, answer2]);
  }
  December.addDay({
    day: 7,
    year: 2018,
    title: 'The Sum of Its Parts',
    questions: [
      'In what order should the steps in your instructions be completed?',
      'With 5 workers and the 60+ second step durations described above, how long will it take to complete all of the steps?',
    ],
    answer: day_7,
    example: [
      `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`,
    ],
  });
})();
