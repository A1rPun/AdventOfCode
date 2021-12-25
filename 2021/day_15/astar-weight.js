import { AStar, manhattanDistance, Point } from '../../js/astar.js';

export class AStarWeight extends AStar {
  constructor(grid, acceptableTiles, weight = 0) {
    super(grid, acceptableTiles);
    this.weight = weight;
  }

  findPath([x1, y1], [x2, y2], fn) {
    const distanceFunction = manhattanDistance ?? fn;
    const Node = (point, parent = null) => ({
      ...point,
      parent,
      key: point.x + point.y * this.worldWidth,
      f: 0,
      g: 0,
    });
    const pathStart = Node(Point(x1, y1));
    const pathEnd = Node(Point(x2, y2));
    let open = [pathStart];
    let closed = [];
    let aStar = [];

    let path = [];
    let length;

    while ((length = open.length)) {
      let max = this.worldSize;
      let min = this.worldMin;

      for (let i = 0; i < length; i++) {
        if (open[i].f < max) {
          max = open[i].f;
          min = i;
        }
      }
      let [node] = open.splice(min, 1);

      if (node.key === pathEnd.key) {
        let nextNode = closed[closed.push(node) - 1];

        do {
          path.push([nextNode.x, nextNode.y]);
        } while ((nextNode = nextNode.parent));
      } else {
        for (const neighbour of this.neighbours(node.x, node.y)) {
          let nextNode = Node(neighbour, node);
          
          if (!aStar[nextNode.key]) {
            nextNode.g = node.g + distanceFunction(neighbour, node) * this.grid[nextNode.y][nextNode.x];
            nextNode.h = nextNode.h ?? this.weight * distanceFunction(neighbour, pathEnd);
            nextNode.f = nextNode.g + nextNode.h;
            open.push(nextNode);
            aStar[nextNode.key] = true;
          }
        }
        closed.push(node);
      }
    }
    return path.reverse();
  }
}
