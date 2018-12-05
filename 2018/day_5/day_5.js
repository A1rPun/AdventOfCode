(function () {
    function react(str) {
        for (let i = 0; i < str.length - 1; i++) {
            const char = str.charCodeAt(i);
            const nextChar = str.charCodeAt(i + 1);

            if (Math.abs(char - nextChar) === 32) {
                str = str.slice(0, i) + str.slice(i + 2);
                i -= 2;
            }
        }
        return str;
    }
    function day_5(puzzle) {
        const answer1 = react(puzzle);

        const polymers = [];
        for (let c = 65; c < 91; c++) {
            const char = String.fromCharCode(c);
            const lowerChar = String.fromCharCode(c + 32);
            const replaced = puzzle.replace(new RegExp(`[${char}${lowerChar}]`, 'g'), '');
            const reacted = react(replaced);
            polymers.push(reacted.length);
        }
        const answer2 = Math.min(...polymers);

        return Promise.resolve([answer1.length, answer2]);
    }
    December.addDay({
        day: 5,
        year: 2018,
        title: 'Alchemical Reduction',
        questions: [
            'How many units remain after fully reacting the polymer you scanned?',
            'What is the length of the shortest polymer you can produce'
        ],
        answer: day_5,
        example: function () {
            return 'dabAcCaCBAcCcaDA';
        },
    });
}());
