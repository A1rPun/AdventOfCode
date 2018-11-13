(function () {
    function hexToByte(h) {
        return parseInt(h, 16).toString(2).padStart(4, '0');
    }

    function rowHash(input) {
        return December.knotHash(input).split('').map(hexToByte).join('');
    }

    function day_14(puzzle) {
        const rows = December.range(128).map(x => rowHash(`${puzzle}-${x}`));
        const answer1 = December.count(rows.join('\n'), '1');
        const answer2 = 0;//findRegions(rows);
        return Promise.resolve([answer1, answer2]);
    }
    December.addDay({
        day: 14,
        year: 2017,
        title: 'Disk Defragmentation',
        questions: ['How many squares are used?', 'How many regions are present given your key string?'],
        answer: day_14,
        input: function () {
            return 'hxtvlmkl';
        },
        example: function () {
            return 'flqrgnkx';
        },
    });
}());
