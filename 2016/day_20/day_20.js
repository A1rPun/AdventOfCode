(function () {
    function day_20(puzzle) {
        puzzle = puzzle.split('\n');
        puzzle.push(puzzle.length > 10 ? '4294967296-4294967296' : '10-10'); // MAX 4294967295
        puzzle = puzzle.map(x => {
            const [low, high] = x.split('-').map(December.toInt);
            return { low, high };
        }).sort((a, b) => a.low - b.low);

        const whitelist = {};
        let currentHighest = 0;
        puzzle.forEach(x => {
            const current = x.high + 1;

            if (x.low > currentHighest)
                whitelist[currentHighest] = x.low - currentHighest;

            if (current > currentHighest)
                currentHighest = current;
        });

        const answer1 = Math.min(...Object.keys(whitelist));
        const answer2 = Object.values(whitelist).reduce(December.plus);
        return Promise.resolve([answer1, answer2]);
    }

    December.addDay({
        day: 20,
        year: 2016,
        title: 'Firewall Rules',
        questions: [
            'What is the lowest-valued IP that is not blocked?',
            'How many IPs are allowed by the blacklist?'
        ],
        answer: day_20,
        example: function () {
            return `5-8
0-2
4-7`;
        },
    });
}());
