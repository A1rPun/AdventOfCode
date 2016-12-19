(function () {
    function dragonCurve(bits) {
        var result = bits + '0';
        for (var i = bits.length; i--;)
            result += bits[i] === '0' ? '1' : '0';
        return result;
    }

    function getChecksum(bits) {
        var result = '';
        for (var i = 0, l = bits.length; i < l; i += 2)
            result += bits[i] === bits[i + 1] ? '1' : '0';
        return result;
    }

    function day_16(puzzle) {
        var bits = puzzle[0];
        var length = puzzle[1];
        while (bits.length < length) {
            bits = dragonCurve(bits);
        }
        bits = bits.slice(0, length);
        while (!(bits.length & 1)) {
            bits = getChecksum(bits);
        }
        return Promise.resolve(bits);
    }

    December.addDay({
        day: 16,
        title: 'Dragon Checksum',
        questions: 'What is the correct checksum?',
        answer: day_16,
        input: function () { return ['01111010110010011', 272]; }, // answer 2 = ['01111010110010011', 35651584]
        example: function () { return ['10000', 20]; }
    });
}());
