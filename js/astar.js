var AStar = (function () {
    var abs = Math.abs;
    var max = Math.max;
    var pow = Math.pow;
    var sqrt = Math.sqrt;

    function p47hF1nd3r() {
        this.acceptableTiles = [0];
        this.grid = [[]];
    }

    p47hF1nd3r.prototype = {
        setAcceptableTiles: function (acceptableTiles) {
            this.acceptableTiles = acceptableTiles;
        },
        setGrid: function (level) {
            this.grid = level;
            this.worldHeight = level.length;
            this.worldWidth = level[0].length;            
            this.worldSize = this.worldHeight * this.worldWidth;
        },
        ManhattanDistance: function (Point, Goal) {	// linear movement - no diagonals - just cardinal directions (NSEW)
            return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
        },
        DiagonalDistance: function (Point, Goal) {	// diagonal movement - assumes diag dist is 1, same as cardinals
            return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
        },
        EuclideanDistance: function (Point, Goal) {	// diagonals are considered a little farther than cardinal directions
            return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
        },
        Neighbours: function (x, y) {
            var N = y - 1,
                S = y + 1,
                E = x + 1,
                W = x - 1,
                myN = N > -1 && this.canWalkHere(x, N),
                myS = S < this.worldHeight && this.canWalkHere(x, S),
                myE = E < this.worldWidth && this.canWalkHere(E, y),
                myW = W > -1 && this.canWalkHere(W, y),
                result = [];

            if (myN)
                result.push({ x: x, y: N });
            if (myE)
                result.push({ x: E, y: y });
            if (myS)
                result.push({ x: x, y: S });
            if (myW)
                result.push({ x: W, y: y });
            return result;
        },
        DiagonalNeighbours: function (myN, myS, myE, myW, N, S, E, W, result) {
            if (myN) {
                if (myE && this.canWalkHere(E, N))
                    result.push({ x: E, y: N });
                if (myW && this.canWalkHere(W, N))
                    result.push({ x: W, y: N });
            }
            if (myS) {
                if (myE && this.canWalkHere(E, S))
                    result.push({ x: E, y: S });
                if (myW && this.canWalkHere(W, S))
                    result.push({ x: W, y: S });
            }
        },
        DiagonalNeighboursFree: function (myN, myS, myE, myW, N, S, E, W, result) {
            myN = N > -1;
            myS = S < this.worldHeight;
            myE = E < this.worldWidth;
            myW = W > -1;
            if (myE) {
                if (myN && this.canWalkHere(E, N))
                    result.push({ x: E, y: N });
                if (myS && this.canWalkHere(E, S))
                    result.push({ x: E, y: S });
            }
            if (myW) {
                if (myN && this.canWalkHere(W, N))
                    result.push({ x: W, y: N });
                if (myS && this.canWalkHere(W, S))
                    result.push({ x: W, y: S });
            }
        },
        canWalkHere: function (x, y) {
            return this.grid && this.grid[y] &&
				   this.acceptableTiles.indexOf(this.grid[y][x]) !== -1;
        },
        findPath: function (pathStart, pathEnd) {        
            var distanceFunction = this.ManhattanDistance;
            var findNeighbours = function () { };
            var a = this;
            function Node(Parent, Point) {
                return {
                    Parent: Parent,
                    value: Point.x + (Point.y * a.worldWidth),
                    x: Point.x,
                    y: Point.y,
                    f: 0,
                    g: 0
                };
            }
            var mypathStart = Node(null, { x: pathStart[0], y: pathStart[1] });
            var mypathEnd = Node(null, { x: pathEnd[0], y: pathEnd[1] });
            var AStar = [];
            var Open = [mypathStart];
            var Closed = [];
            var result = [];
            var myNeighbours;
            var myNode;
            var myPath;
            var length, max, min, i, j;
            while (length = Open.length) {
                max = this.worldSize;
                min = -1;
                for (i = 0; i < length; i++) {
                    if (Open[i].f < max) {
                        max = Open[i].f;
                        min = i;
                    }
                }
                myNode = Open.splice(min, 1)[0];
                if (myNode.value === mypathEnd.value) {
                    myPath = Closed[Closed.push(myNode) - 1];
                    do {
                        result.push([myPath.x, myPath.y]);
                    }
                    while (myPath = myPath.Parent);
                    AStar = Closed = Open = [];
                    result.reverse();
                } else {
                    myNeighbours = this.Neighbours(myNode.x, myNode.y);
                    for (i = 0, j = myNeighbours.length; i < j; i++) {
                        myPath = Node(myNode, myNeighbours[i]);
                        if (!AStar[myPath.value]) {
                            myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
                            myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
                            Open.push(myPath);
                            AStar[myPath.value] = true;
                        }
                    }
                    Closed.push(myNode);
                }
            }
            return result;
        }
    };
    return p47hF1nd3r;
}());

/*
// alternate heuristics

// diagonals allowed but no sqeezing through cracks:
var distanceFunction = DiagonalDistance;
var findNeighbours = DiagonalNeighbours;

// diagonals and squeezing through cracks allowed:
var distanceFunction = DiagonalDistance;
var findNeighbours = DiagonalNeighboursFree;

// euclidean but no squeezing through cracks:
var distanceFunction = EuclideanDistance;
var findNeighbours = DiagonalNeighbours;

// euclidean and squeezing through cracks allowed:
var distanceFunction = EuclideanDistance;
var findNeighbours = DiagonalNeighboursFree;

*/
