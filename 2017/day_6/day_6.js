(function () {
    function getIndexFromMaxValue(list) {
        var index = -1;
        var maxValue = -1;
        for (var i = 0, l = list.length; i < l; i++) {
            var val = list[i];
            if (val > maxValue) {
                maxValue = val;
                index = i;
            }
        }
        return index;
    }
    function day_6(puzzle) {
        var banks = puzzle.split('\t').map(function (x) { return +x });
        var uniqueState = {};
        var cycles = 0;
        var answer1 = 0;
        var answer2 = 0;
        while (true) {
            var index = getIndexFromMaxValue(banks);
            var blocks = banks[index];
            banks[index] = 0;
            while (blocks) {
                index = ++index % banks.length;
                banks[index]++;
                blocks--;
            }
            cycles++;
            // Stop loop?
            var key = banks.join('_');
            if (uniqueState[key]) {
                if (uniqueState[key] === 1) {
                    if (!answer1) answer1 = cycles;
                    uniqueState[key]++;
                } else {
                    answer2 = cycles - answer1;
                    break;
                }
            } else
                uniqueState[key] = 1;
        }
        return Promise.resolve([answer1, answer2]);
    }
    December.addDay({
        day: 6,
        year: 2017,
        title: 'Memory Reallocation',
        questions: ['Given the initial block counts in your puzzle input, how many redistribution cycles must be completed before a configuration is produced that has been seen before?', 'How many cycles are in the infinite loop that arises from the configuration in your puzzle input?'],
        answer: day_6,
        input: function () {
            return '0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11';
        },
        example: function () {
            return '0	2	7	0';
        },
    });
}());
