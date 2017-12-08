(function () {
    function generateSpiralGrid(count) {
        var axiom = [[1]];
        var current = 1;
        while (count > current) {
            var i;
            // Right side
            for (i = axiom.length; i--;)
                axiom[i].push(++current);
            // Top side
            var top = [];
            for (i = axiom[0].length; i--;)
                top.unshift(++current);
            axiom.unshift(top);
            // Left side
            for (i = 0, l = axiom.length; i < l; i++)
                axiom[i].unshift(++current);
            // Bottom side
            var bottom = [];
            for (i = 0, l = axiom[0].length; i < l; i++)
                bottom.push(++current);
            axiom.push(bottom);
        }
        return axiom;
    }
    function getGridValue(grid, y, x) {
        return grid[y] && grid[y][x] ? grid[y][x] : 0;
    }
    function sumNeighbours(grid, x, y) {
        var n = getGridValue(grid, y - 1, x);
        var ne = getGridValue(grid, y - 1, x + 1);
        var e = getGridValue(grid, y, x + 1);
        var se = getGridValue(grid, y + 1, x + 1);
        var s = getGridValue(grid, y + 1, x);
        var sw = getGridValue(grid, y + 1, x - 1);
        var w = getGridValue(grid, y, x - 1);
        var nw = getGridValue(grid, y - 1, x - 1);
        return n + ne + e + se + s + sw + w + nw;
    }
    function generateNeighbourSpiralGrid(count) {
        var axiom = [[1]];
        var current = 1;
        while (count > current) {
            var i, l;
            // Right side
            for (i = axiom.length; i--;) {
                if (current > count) return current;
                current = sumNeighbours(axiom, axiom.length, i);
                axiom[i].push(current);
            }
            // Top side
            var top = new Array(axiom[0].length);
            l = axiom[0].length;
            axiom.unshift(top);
            for (i = l; i--;) {
                if (current > count) return current;
                current = sumNeighbours(axiom, i, 0);
                top[i] = current;
            }
            // Left side
            for (i = axiom.length; i--;) {
                axiom[i].unshift(0);
            }
            for (i = 0, l = axiom.length; i < l; i++) {
                if (current > count) return current;
                current = sumNeighbours(axiom, 0, i);
                axiom[i][0] = current;
            }
            // Bottom side
            var bottom = new Array(axiom[0].length);
            axiom.push(bottom);
            for (i = 0, l = axiom[0].length; i < l; i++) {
                if (current > count) return current;
                current = sumNeighbours(axiom, i, axiom.length - 1);
                bottom[i] = current;
            }
        }
        return current;
    }
    function pointOnSpiralGrid(grid, value) {
        var l = grid.length;
        for (var y = l; y--;) {
            for (var x = l; x--;) {
                if (grid[y][x] === value) {
                    return { x: x, y: y };
                }
            }
        }
        return { x: 0, y: 0 };
    }
    function day_3(puzzle) {
        var grid = generateSpiralGrid(puzzle);
        var axiom = pointOnSpiralGrid(grid, 1);
        var point = pointOnSpiralGrid(grid, puzzle);
        var answer1 = AStar.prototype.ManhattanDistance(point, axiom);
        var answer2 = generateNeighbourSpiralGrid(puzzle);
        return Promise.resolve([answer1, answer2]);
    }
    December.addDay({
        day: 3,
        year: 2017,
        title: 'Spiral Memory',
        questions: 'How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?',
        answer: day_3,
        input: function () { return 347991; },
        example: function () { return 12; },
    });
}());