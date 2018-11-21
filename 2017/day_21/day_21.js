(function () {
    function rotate(pattern) {
        const length = Math.sqrt(pattern.length);
        return pattern.reduce((acc, curr, i) => {
            acc[(i % length) * length + (length - Math.floor(i / length) - 1)] = curr;
            return acc;
        }, []);
    }

    function flip(pattern) {
        const length = Math.sqrt(pattern.length);
        return pattern.reduce((acc, curr, i) => {
            acc[(Math.floor(i / length) + 1) * length - 1 - (i % length)] = curr;
            return acc;
        }, []);
    }

    function parsePattern(acc, curr) {
        let [patternString, transform] = curr.split(' => ');
        const pattern = patternString.match(/#|\./g);
        return [pattern, rotate(pattern)].reduce((acc, curr) => {
            return [curr, flip(curr)].reduce((acc, curr) => {
                acc[curr.join('')] = transform;
                acc[curr.reverse().join('')] = transform;
                return acc;
            }, acc);
        }, acc);
    }

    function day_21(puzzle) {
        let fractal = '.#...####';
        const patterns = puzzle.split('\n').reduce(parsePattern, {});
        

        const answer1 = December.count(fractal, '#');
        return Promise.resolve([answer1, patterns]);
    }
    December.addDay({
        day: 21,
        year: 2017,
        title: 'Fractal Art',
        questions: 'How many pixels stay on after 5 iterations?',
        answer: day_21,
        example: function () {
            return '../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#';
        },
    });
}());

/* /
Original
.#.
..#
###
Reversed
###
#..
.#.
Flipped X
.#.
#..
###
FlippedReversed
###
..#
.#.

Rotated 90
#..
#.#
##.
Reversed
.##
#.#
..#
Flipped X
..#
#.#
.##
FlippedReversed
##.
#.#
#..
/* */
