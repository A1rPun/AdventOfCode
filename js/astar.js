const abs = Math.abs;
const max = Math.max;
const pow = Math.pow;
const sqrt = Math.sqrt;

class p47hF1nd3r {
  constructor(grid, tiles) {
    this.setGrid(grid);
    this.setAcceptableTiles(tiles);
  }

  setAcceptableTiles(acceptableTiles) {
    this.acceptableTiles = acceptableTiles || [0];
  }

  setGrid(level) {
    this.grid = level || [[]];
    this.worldHeight = level.length;
    this.worldWidth = level[0].length;
    this.worldSize = this.worldHeight * this.worldWidth;
  }

  static ManhattanDistance(Point, Goal) {
    // linear movement - no diagonals - just cardinal directions (NSEW)
    return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
  }

  static DiagonalDistance(Point, Goal) {
    // diagonal movement - assumes diag dist is 1, same as cardinals
    return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
  }

  static EuclideanDistance(Point, Goal) {
    // diagonals are considered a little farther than cardinal directions
    return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
  }

  Neighbours(x, y) {
    const N = y - 1,
      S = y + 1,
      E = x + 1,
      W = x - 1,
      myN = N > -1 && this.canWalkHere(x, N),
      myS = S < this.worldHeight && this.canWalkHere(x, S),
      myE = E < this.worldWidth && this.canWalkHere(E, y),
      myW = W > -1 && this.canWalkHere(W, y),
      result = [];

    if (myN) result.push({ x: x, y: N });
    if (myE) result.push({ x: E, y: y });
    if (myS) result.push({ x: x, y: S });
    if (myW) result.push({ x: W, y: y });
    return result;
  }

  DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
    if (myN) {
      if (myE && this.canWalkHere(E, N)) result.push({ x: E, y: N });
      if (myW && this.canWalkHere(W, N)) result.push({ x: W, y: N });
    }
    if (myS) {
      if (myE && this.canWalkHere(E, S)) result.push({ x: E, y: S });
      if (myW && this.canWalkHere(W, S)) result.push({ x: W, y: S });
    }
  }

  DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
    myN = N > -1;
    myS = S < this.worldHeight;
    myE = E < this.worldWidth;
    myW = W > -1;
    if (myE) {
      if (myN && this.canWalkHere(E, N)) result.push({ x: E, y: N });
      if (myS && this.canWalkHere(E, S)) result.push({ x: E, y: S });
    }
    if (myW) {
      if (myN && this.canWalkHere(W, N)) result.push({ x: W, y: N });
      if (myS && this.canWalkHere(W, S)) result.push({ x: W, y: S });
    }
  }

  canWalkHere(x, y) {
    return (
      this.grid &&
      this.grid[y] &&
      this.acceptableTiles.indexOf(this.grid[y][x]) !== -1
    );
  }

  findPath(pathStart, pathEnd) {
    const distanceFunction = this.ManhattanDistance;
    const findNeighbours = () => {};
    const a = this;
    function Node(Parent, Point) {
      return {
        Parent: Parent,
        value: Point.x + Point.y * a.worldWidth,
        x: Point.x,
        y: Point.y,
        f: 0,
        g: 0,
      };
    }
    const mypathStart = Node(null, { x: pathStart[0], y: pathStart[1] });
    const mypathEnd = Node(null, { x: pathEnd[0], y: pathEnd[1] });
    let AStar = [];
    let Open = [mypathStart];
    let Closed = [];
    let result = [];
    let myNeighbours;
    let myNode;
    let myPath;
    let length, max, min, i, j;

    while ((length = Open.length)) {
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
        } while ((myPath = myPath.Parent));
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
}

export default p47hF1nd3r;
/*
// alternate heuristics

// diagonals allowed but no sqeezing through cracks:
const distanceFunction = DiagonalDistance;
const findNeighbours = DiagonalNeighbours;

// diagonals and squeezing through cracks allowed:
const distanceFunction = DiagonalDistance;
const findNeighbours = DiagonalNeighboursFree;

// euclidean but no squeezing through cracks:
const distanceFunction = EuclideanDistance;
const findNeighbours = DiagonalNeighbours;

// euclidean and squeezing through cracks allowed:
const distanceFunction = EuclideanDistance;
const findNeighbours = DiagonalNeighboursFree;

*/
