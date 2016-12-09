(function () {
    var directions = {
        north: 0,
        east: 1,
        south: 2,
        west: 3
    };

    function getDirection(direction, left) {
        if (direction === directions.east)
            return left ? directions.north : directions.south;
        else if (direction === directions.south)
            return left ? directions.east : directions.west;
        else if (direction === directions.west)
            return left ? directions.south : directions.north;
        else
            return left ? directions.west : directions.east;
    }

    function getPoints(direction, point, num) {
        var points = [];
        
        for (var i = 0; i < num; i++) {
            var p = { x: point.x, y: point.y };
            if (direction === directions.east)
                p.x++;
            else if (direction === directions.south)
                p.y++;
            else if (direction === directions.west)
                p.x--;
            else
                p.y--;
            points.push(p);
            point = p;
        }
        return points;
    }

    function ManhattanDistance(Point, Goal) {
        return Math.abs(Point.x - Goal.x) + Math.abs(Point.y - Goal.y);
    }

    function day_1() {
        var currentDirection = directions.north;
        var startPoint = { x: 0, y: 0 };
        var endPoint = { x: 0, y: 0 };
        var inputs = getInput().split(', ');
        var answer1;
        var answer2;

        var points = [];
        for (var i = 0; i < inputs.length; i++) {
            var d = inputs[i];
            var left = d[0] === 'L';
            var num = +d.slice(1);
            currentDirection = getDirection(currentDirection, left);
            var pts = getPoints(currentDirection, endPoint, num);
            points = points.concat(pts);
            endPoint = pts[pts.length - 1];
        }
        answer1 = ManhattanDistance(startPoint, endPoint);

        var dict = {};
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var key = p.x + '_' + p.y;
            if (dict[key]) {
                answer2 = ManhattanDistance(startPoint, p);
                break;
            } else
                dict[key] = true;//{ x: endPoint.x, y: endPoint.y };
        }
        return new Promise.resolve([answer1, answer2]);
    };

    function getInput() {
        return 'R1, R3, L2, L5, L2, L1, R3, L4, R2, L2, L4, R2, L1, R1, L2, R3, L1, L4, R2, L5, R3, R4, L1, R2, L1, R3, L4, R5, L4, L5, R5, L3, R2, L3, L3, R1, R3, L4, R2, R5, L4, R1, L1, L1, R5, L2, R1, L2, R188, L5, L3, R5, R1, L2, L4, R3, R5, L3, R3, R45, L4, R4, R72, R2, R3, L1, R1, L1, L1, R192, L1, L1, L1, L4, R1, L2, L5, L3, R5, L3, R3, L4, L3, R1, R4, L2, R2, R3, L5, R3, L1, R1, R4, L2, L3, R1, R3, L4, L3, L4, L2, L2, R1, R3, L5, L1, R4, R2, L4, L1, R3, R3, R1, L5, L2, R4, R4, R2, R1, R5, R5, L4, L1, R5, R3, R4, R5, R3, L1, L2, L4, R1, R4, R5, L2, L3, R4, L4, R2, L2, L4, L2, R5, R1, R4, R3, R5, L4, L4, L5, L5, R3, R4, L1, L3, R2, L2, R1, L3, L5, R5, R5, R3, L4, L2, R4, R5, R1, R4, L3';
    }

    December.addDay({
        day: 1,
        title: 'No Time for a Taxicab',
        questions: ['How many blocks away is Easter Bunny HQ?', 'How many blocks away is the first location you visit twice?'],
        input: getInput,
        answer: day_1
    });
}());
