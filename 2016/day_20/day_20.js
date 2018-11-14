(function () {
    function day_20(puzzle) {
        var whitelist = [];
        puzzle.push('4294967296-4294967297'); // MAX 4294967295
        puzzle = puzzle
            .map(function (x) {
                var split = x.split('-');
                return { low: +split[0], high: +split[1] };
            })
            .sort(function (a, b) { return a.low - b.low; });

        for (var i = 0, l = puzzle.length - 1; i < l; i++) {
            var item1 = puzzle[i];
            var item2 = puzzle[i + 1];
            var c = item1.high + 1;
            if (c < item2.low && item1.low < item2.low) {
                whitelist.push({ start: c, count: item2.low - c });
            } else {
                item2.low = c;
            }
        }
        var count = whitelist.reduce(function (a, b) { return a + b.count; }, 0);
        return Promise.resolve([whitelist[0].start, count, whitelist]);
    }

    December.addDay({
        day: 20,
        year: 2016,
        title: 'Firewall Rules',
        questions: ['What is the lowest-valued IP that is not blocked?', 'How many IPs are allowed by the blacklist?'],
        answer: day_20,
        example: function () {
            return `5-8
0-2
4-7`;
        },
        development: true,
    });
}());
