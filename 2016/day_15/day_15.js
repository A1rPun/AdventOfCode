(function () {
    function Disc(positions, start) {
        this.positions = positions;
        this.start = start;
    }
    Disc.prototype = {
        canPass: function (time) {
            return (time + this.start) % this.positions === 0;
        }
    };

    function checkTime(discs, time) {
        for (var i = 0; i < discs.length; i++) {
            time++;
            if (!discs[i].canPass(time))
                return;
        }
        return true;
    }

    function day_15(puzzle) {
        var discs = [];
        for (var i = 0; i < puzzle.length; i++) {
            var matches = puzzle[i].match(/\d+/g);
            discs.push(new Disc(+matches[1], +matches[3]));
        }
        discs.push(new Disc(11, 0)); // Answer2

        var answer1 = -1;
        var validTime = false;
        while (!validTime) {
            answer1++;
            validTime = checkTime(discs, answer1);            
        }
        return Promise.resolve(answer1);
    }

    December.addDay({
        day: 15,
        title: 'Timing is Everything',
        questions: 'What is the first time you can press the button to get a capsule?',
        answer: day_15,
        /* */
        input: function () {
            return [
                'Disc #1 has 7 positions; at time=0, it is at position 0.',
                'Disc #2 has 13 positions; at time=0, it is at position 0.',
                'Disc #3 has 3 positions; at time=0, it is at position 2.',
                'Disc #4 has 5 positions; at time=0, it is at position 2.',
                'Disc #5 has 17 positions; at time=0, it is at position 0.',
                'Disc #6 has 19 positions; at time=0, it is at position 7.'
            ];
        },
        /* */
        example: function () {
            return [
                'Disc #1 has 5 positions; at time=0, it is at position 4.',
                'Disc #2 has 2 positions; at time=0, it is at position 1.'
            ];
        }
    });
}());
