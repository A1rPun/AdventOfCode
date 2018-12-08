(function () {
    function day_7(puzzle) {
        const steps = puzzle.split('\n').map(x => x.match(/[A-Z]/g)).reduce((acc, curr) => {
            let [, beforeStep, step] = curr;
            if (!acc[beforeStep])
                acc[beforeStep] = { letter: beforeStep, dependsOn: [] };

            if (acc[step])
                acc[step].dependsOn.push(beforeStep);
            else
                acc[step] = { letter: step, dependsOn: [beforeStep] };
            return acc;
        }, {});
        const starters = Object.values(steps).filter(x => !x.dependsOn.length).map(x => x.letter);
        let answer1 = '';
        while (starters.length) {
            const nextStep = starters.sort().shift();
            answer1 += nextStep;
            for (const key in steps) {
                const step = steps[key];
                const nextStepIndex = step.dependsOn.indexOf(nextStep);
                if (~nextStepIndex) {
                    step.dependsOn.splice(nextStepIndex, 1);
                    if (!step.dependsOn.length) {
                        starters.push(step.letter);
                    }
                }
            }
        }
        return Promise.resolve([answer1]);
    }
    December.addDay({
        day: 7,
        year: 2018,
        title: 'The Sum of Its Parts',
        questions: 'In what order should the steps in your instructions be completed?',
        answer: day_7,
        example: function () {
            return `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
        },
    });
}());
