(function () {
    function knotHash(input, times) {
        let hash = [...Array(256).keys()];
        const l = hash.length;
        let hashIndex = 0;
        let skipSize = 0;
        while (times--) {
            for (let i = 0; i < input.length; i++) {
                const knotLength = input[i];
                const toIndex = hashIndex + knotLength;
                var wrapIndex = toIndex > l ? toIndex - l : -1;
                let current = (~wrapIndex
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
        const input1 = puzzle.split(',').map(function (e) { return +e; });
        const input2 = puzzle.split('').map(function (char) {
            return char.charCodeAt(0);
        }).concat([17, 31, 73, 47, 23]);
        const answer1 = knotHash(input1, 1);
        const densedHash = dense(knotHash(input2, 64));
        const answer2 = densedHash.map(function (a) {
            return a.toString(16).padStart(2, '0');
        }).join('');
        return Promise.resolve([answer1[0] * answer1[1], answer2]);
    }

    December.addDay({
        day: 10,
        year: 2017,
        title: 'Knot Hash',
        questions: 'What is the result of multiplying the first two numbers in the list?',
        answer: day_10,
        input: function () {
            //70b856a24d586194331398c7fcfa0aaf
            return '147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70';
        },
        example: function () {
            return '1,2,3';
        },
    });
}());
