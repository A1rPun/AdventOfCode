﻿export function manhattanDistance(point, goal) {
  return Math.abs(point.x - goal.x) + Math.abs(point.y - goal.y);
}

export const Point = (x, y) => ({ x, y });

export class AStar {
  constructor(grid, acceptableTiles) {
    this.grid = grid || [[]];
    this.acceptableTiles = acceptableTiles || [0];
    this.worldMin = -1;
    this.worldHeight = grid.length;
    this.worldWidth = grid[0].length;
    this.worldSize = this.worldHeight * this.worldWidth;
  }

  neighbours(x, y) {
    const north = y - 1;
    const east = x + 1;
    const south = y + 1;
    const west = x - 1;
    const result = [];
    const canWalkHere = (x, y) =>
      this.acceptableTiles.find((tile) => tile === this.grid[y][x]);

    if (north > this.worldMin && canWalkHere(x, north))
      result.push(Point(x, north));
    if (east < this.worldWidth && canWalkHere(east, y))
      result.push(Point(east, y));
    if (south < this.worldHeight && canWalkHere(x, south))
      result.push(Point(x, south));
    if (west > this.worldMin && canWalkHere(west, y))
      result.push(Point(west, y));

    return result;
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
            nextNode.g = node.g + distanceFunction(neighbour, node);
            nextNode.f = nextNode.g + distanceFunction(neighbour, pathEnd);
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
