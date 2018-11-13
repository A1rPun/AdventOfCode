(function () {
    function tieKnots(input, times = 64) {
        let hash = December.range(256);
        const l = hash.length;
        let hashIndex = 0;
        let skipSize = 0;
        while (times--) {
            for (let i = 0; i < input.length; i++) {
                const knotLength = input[i];
                const toIndex = hashIndex + knotLength;
                const wrapIndex = toIndex > l ? toIndex - l : -1;
                const current = (~wrapIndex
                    ? hash.slice(hashIndex, l + 1).concat(hash.slice(0, wrapIndex))
                    : hash.slice(hashIndex, toIndex)).reverse();
                hash = ~wrapIndex
                    ? current.slice(-wrapIndex).concat(hash.slice(wrapIndex, hashIndex)).concat(current.slice(0, -wrapIndex))
                    : hash.slice(0, hashIndex).concat(current).concat(hash.slice(toIndex, l + 1));
                hashIndex = (toIndex + skipSize) % l;
                skipSize++;
            }
        }
        return hash;
    }

    function dense(hash) {
        let densedHash = [];
        let xorred = hash.reduce(function (prev, curr, i) {
            if (i % 16 === 0) {
                densedHash.push(prev);
                return curr;
            }
            return prev ^ curr;
        });
        densedHash.push(xorred);
        return densedHash;
    }

    function day_10(puzzle) {
        const answer1 = tieKnots(puzzle.split(',').map(x => +x), 1);
        const answer2 = knotHash(puzzle);
        return Promise.resolve([answer1[0] * answer1[1], answer2]);
    }

    function knotHash(puzzle) {
        const lengths = puzzle.split('').map(function (char) { return char.charCodeAt(0); }).concat([17, 31, 73, 47, 23]);
        const densedHash = dense(tieKnots(lengths));
        return densedHash.map(function (a) { return a.toString(16).padStart(2, '0'); }).join('');
    }

    December.addDay({
        day: 10,
        year: 2017,
        title: 'Knot Hash',
        questions: [
            'What is the result of multiplying the first two numbers in the list?',
            'Treating your puzzle input as a string of ASCII characters, what is the Knot Hash of your puzzle input?',
        ],
        answer: day_10,
        input: function () {
            return '147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70';
        },
        example: function () {
            return '1,2,3';
        },
        public: {
            knotHash: knotHash,
        },
    });
}());
