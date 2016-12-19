(function () {
    function getTile(x, y, num) {
        var sum = (x * x + 3 * x + 2 * x * y + y + y * y) + num;
        var bitCount = December.count(sum.toString(2), '1');
        return bitCount & 1 ? '#' : '.';
    }

    function day_13(puzzle) {
        var grid = [];
        for (var y = 0; y < puzzle[2]; y++) {
            var row = [];
            for (var x = 0; x < puzzle[2]; x++)
                row.push(getTile(x, y, puzzle[0]));
            grid.push(row);
        }
        var astar = new AStar(grid, ['.']);
        var path = astar.findPath([1, 1], puzzle[1]);

        /* /
        var answer2 = 1;
        for (var y = 0; y < puzzle[2]; y++)
            for (var x = 0; x < puzzle[2]; x++) {
                var length = astar.findPath([1, 1], [x, y]).length - 1;
                if (length > 0 && length <= 50)
                    answer2++;
            }
        /* */
        return Promise.resolve(prettifyGrid(grid, path));
    }

    function prettifyGrid(grid, path) {
        for (var i = 0; i < path.length; i++)
            grid[path[i][1]][path[i][0]] = i === path.length - 1 ? 'X' : 'O';
        return December.prettify(grid);
    }

    December.addDay({
        day: 13,
        title: 'A Maze of Twisty Little Cubicles',
        questions: ['What is the fewest number of steps required for you to reach 31,39?', 'How many locations (distinct x,y coordinates, including your starting location) can you reach in at most 50 steps?'],
        answer: day_13,
        input: function () { return [1358, [31, 39], 45]; },
        example: function () { return [10, [7, 4], 10]; }
    });
}());
