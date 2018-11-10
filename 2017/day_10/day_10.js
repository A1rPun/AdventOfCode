(function () {
    function day_10(puzzle) {
        var list = [...Array(puzzle[0]).keys()];
        var l = list.length;
        var input = puzzle[1].split(',').map(function (e) { return +e; });
        var listIndex = 0;
        var skipSize = 0;

        for (let i = 0; i < input.length; i++) {
            const knotLength = input[i];
            const toIndex = listIndex + knotLength;
            var wrapIndex = toIndex > l ? toIndex - l : -1;
            let current = (~wrapIndex
                ? list.slice(listIndex, l + 1).concat(list.slice(0, wrapIndex))
                : list.slice(listIndex, toIndex)).reverse();
            list = ~wrapIndex
                ? current.slice(-wrapIndex).concat(list.slice(wrapIndex, listIndex)).concat(current.slice(0, -wrapIndex))
                : list.slice(0, listIndex).concat(current).concat(list.slice(toIndex, l + 1));
            listIndex = (listIndex + knotLength + skipSize) % l;
            skipSize++;
        }
        const answer1 = list[0] * list[1];
        return Promise.resolve([answer1]);
    }
    December.addDay({
        day: 10,
        year: 2017,
        title: 'Knot Hash',
        questions: 'What is the result of multiplying the first two numbers in the list?',
        answer: day_10,
        input: function () {
            return [
                256,
                '147,37,249,1,31,2,226,0,161,71,254,243,183,255,30,70',
            ];
        },
        example: function () {
            return [
                5,
                '3, 4, 1, 5',
            ];
        },
    });
}());
