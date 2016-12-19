(function () {
    function stealLeftPresents(arr) {
        var odd = arr.length & 1;
        arr = arr.filter(function (element, index) {
            return (index % 2 === 0);
        });
        if (odd)
            arr.shift();
        return arr;
    }

    function stealOppositePresents(arr) {
        return [arr[0]];
    }

    function day_19(puzzle) {
        var answer1 = [];
        var answer2 = [];
        for (var i = 0; i < puzzle; i++) {
            answer1.push(i + 1);
            answer2.push(i + 1);
        }
        while (answer1.length > 1)
            answer1 = stealLeftPresents(answer1);
        while (answer2.length > 1)
            answer2 = stealOppositePresents(answer2);
        return Promise.resolve([answer1[0], answer2[0]]);
    }

    December.addDay({
        day: 19,
        title: 'An Elephant Named Joseph',
        questions: 'Which Elf gets all the presents?',
        answer: day_19,
        input: function () { return 3012210; },
        example: function () { return 5; }
    });
}());