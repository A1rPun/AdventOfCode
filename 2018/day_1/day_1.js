(function () {
    function day_1(puzzle) {
        puzzle = puzzle.split('\n').map(December.toInt);
        const answer1 = puzzle.reduce(December.plus);

        let answer2;
        let i = 0;
        let acc = 0;
        const dict = { 0: 1 };
        while (!answer2) {
            acc += puzzle[i];
            if (dict[acc])
                answer2 = acc;
            else
                dict[acc] = 1;
            i = (i + 1) % puzzle.length;
        }
        return Promise.resolve([answer1, answer2]);
    }
    December.addDay({
        day: 1,
        year: 2018,
        title: 'Chronal Calibration',
        questions: [
            'Starting with a frequency of zero, what is the resulting frequency after all of the changes in frequency have been applied?',
            'What is the first frequency your device reaches twice?'
        ],
        answer: day_1,
    });
}());
