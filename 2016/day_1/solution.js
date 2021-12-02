(function() {
  var directions = {
    north: 0,
    east: 1,
    south: 2,
    west: 3,
  };

  function getDirection(direction, left) {
    if (direction === directions.east)
      return left ? directions.north : directions.south;
    else if (direction === directions.south)
      return left ? directions.east : directions.west;
    else if (direction === directions.west)
      return left ? directions.south : directions.north;
    else return left ? directions.west : directions.east;
  }

  function getPoints(direction, point, num) {
    var points = [];

    for (var i = 0; i < num; i++) {
      var p = new Vector(point.x, point.y);
      if (direction === directions.east) p.x++;
      else if (direction === directions.south) p.y++;
      else if (direction === directions.west) p.x--;
      else p.y--;
      points.push(p);
      point = p;
    }
    return points;
  }

  function day_1(puzzle) {
    var currentDirection = directions.north;
    var startPoint = new Vector();
    var endPoint = new Vector();
    var inputs = puzzle.split(', ');
    var answer1 = 0;
    var answer2 = 0;

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
    answer1 = AStar.prototype.ManhattanDistance(startPoint, endPoint);

    var dict = {};
    for (var i = 0; i < points.length; i++) {
      var p = points[i];
      var key = p.x + '_' + p.y;
      if (dict[key]) {
        answer2 = AStar.prototype.ManhattanDistance(startPoint, p);
        break;
      } else dict[key] = true; // new Vector(endPoint.x, endPoint.y);
    }
    return [answer1, answer2];
  }

  December.addDay({
    day: 1,
    year: 2016,
    title: 'No Time for a Taxicab',
    questions: [
      'How many blocks away is Easter Bunny HQ?',
      'How many blocks away is the first location you visit twice?',
    ],
    answer: day_1,
    example: ['R5, L5, R5, R3, R8, R4, R4, R8'],
  });
})();
