(function () {
    function getTile(x, y, num) {
        var sum = (x * x + 3 * x + 2 * x * y + y + y * y) + num;
        var bitCount = (sum.toString(2).match(/1/g) || []).length;
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

        var astar = new AStar();
        astar.setGrid(grid);
        astar.setAcceptableTiles(['.']);
        var path = astar.findPath([1, 1], puzzle[1]);
        return Promise.resolve(prettifyGrid(grid, path));
    }

    function prettifyGrid(grid, path) {
        var result = '';
        for (var i = 0; i < path.length; i++) {
            var o = path[i];
            grid[o[1]][o[0]] = 'O';
        }
        for (var i = 0; i < grid.length; i++)
            result += grid[i].join('') + '\n';        
        return result;
    }

    December.addDay({
        day: 13,
        title: 'A Maze of Twisty Little Cubicles',
        questions: 'What is the fewest number of steps required for you to reach 31,39?',
        answer: day_13,
        input: function () { return [1358, [31, 39], 45]; },
        example: function () { return [10, [7, 4], 10]; }
    });
}());
