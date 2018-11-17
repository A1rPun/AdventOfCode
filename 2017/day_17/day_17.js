(function () {
    function day_17(puzzle) {
        const buffer = [0];
        const max = 2017;
        let position = 0;
        for (let i = 0; i < max;) {
            position = (position + puzzle) % buffer.length;
            buffer.splice(++position, 0, ++i);
        }
        const answer1 = buffer[buffer.indexOf(max) + 1];
        return Promise.resolve(answer1);
    }
    December.addDay({
        day: 17,
        year: 2017,
        title: 'Spinlock',
        questions: [
            'What is the value after 2017 in your completed circular buffer?',
            'What is the value after 0 the moment 50000000 is inserted?'
        ],
        answer: day_17,
        input: 329,
        example: function () {
            return 3;
        },
    });
}());
