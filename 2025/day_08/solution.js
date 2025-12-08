import { toInt } from '../../js/december.js';

class JunctionBox {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.closest = null;
    this.circuit = [];
  }

  distanceTo(box) {
    return Math.max(
      Math.abs(this.x - box.x),
      Math.abs(this.y - box.y),
      Math.abs(this.z - box.z)
    );
  }
}

export default {
  title: 'Playground',
  questions: [
    'What do you get if you multiply together the sizes of the three largest circuits?',
    '',
  ],
  answer1: (puzzle) => {
    const boxes = puzzle
      .split('\n')
      .map(x => new JunctionBox(...x.split(',')
      .map(toInt)));

    for (const box of boxes) {
      const distances = boxes
        .filter(x => x !== box)
        .map(x => ({
          box: x,
          distance: x.distanceTo(box),
        }))
        .sort((a, b) => a.distance - b.distance);
      box.closest = distances[0].box;
    }

    let circuits = [];

    for (const box of boxes) {
      if (box === box.closest.closest) continue;
      circuits.push(box);
    }



    return circuits.length;
  },
  answer2: (puzzle) => {
    return '';
  },
  example: [
    {
      input: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
      solutions: [40],
    },
  ],
  solutions: [],
};
