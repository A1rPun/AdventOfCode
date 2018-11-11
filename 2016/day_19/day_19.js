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
        var odd = arr.length & 1;
        /*
        for (var i = 0, l = arr.length / 2; i < l; i++) {
            var middle = Math.floor(arr.length / 2) + i;
            if (middle < arr.length)
                arr.splice(middle, 1);
            else
                break;
        }
        if (odd) {
            var middle = Math.floor(arr.length / 2) + i;
            arr.splice(middle < arr.length ? middle : 0, 1);
        }
        */
        return arr;
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
        year: 2016,
        title: 'An Elephant Named Joseph',
        questions: 'Which Elf gets all the presents?',
        answer: day_19,
        input: function () { return 3012210; },
        example: function () { return 5; },
        development: true,
    });
}());
