(function () {
    var TARP = '^';
    var SAFE = '.';
    /*
        Its left and center tiles are traps, but its right tile is not.
        Its center and right tiles are traps, but its left tile is not.
        Only its left tile is a trap.
        Only its right tile is a trap.
     */

    function determineTrap(left, center, right) {
        var isTrap = (left === TARP && center === TARP && right !== TARP)
                || (left !== TARP && center === TARP && right === TARP)
                || (left === TARP && center !== TARP && right !== TARP)
                || (left !== TARP && center !== TARP && right === TARP);
        return isTrap ? TARP : SAFE;
    }

    function day_18(puzzle) {
        var floor = [puzzle[0]];
        var length = puzzle[1] - 1;
        for (var i = 0; i < length; i++) {
            var previousRow = floor[i];
            var row = '';
            for (var j = 0; j < previousRow.length; j++)
                row += determineTrap(previousRow[j - 1], previousRow[j], previousRow[j + 1]);
            floor.push(row);
        }
        var answer1 = December.count(floor.join(''), '\\.');
        return Promise.resolve(answer1);
    }

    December.addDay({
        day: 18,
        year: 2016,
        title: 'Like a Rogue',
        questions: 'Starting with the map in your puzzle input, in a total of 40 rows (including the starting row), how many safe tiles are there?',
        answer: day_18,
        input: function () {
            return ['.^^.^^^..^.^..^.^^.^^^^.^^.^^...^..^...^^^..^^...^..^^^^^^..^.^^^..^.^^^^.^^^.^...^^^.^^.^^^.^.^^.^.', 40]; // answer2 = 400000
        },
        example: function () {
            return ['..^^.', 3];
        }
    });
}());
