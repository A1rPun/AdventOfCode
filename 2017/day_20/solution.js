import { toInt } from '../../js/december.js';
import Vector from '../../js/vector.js';

class Particle {
  constructor(px, py, pz, vx, vy, vz, ax, ay, az) {
    this.position = new Vector(px, py, pz);
    this.velocity = new Vector(vx, vy, vz);
    this.acceleration = new Vector(ax, ay, az);
    this.collided = false;
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }
  distance(v) {
    return (
      Math.abs(this.position.x - v.position.x) +
      Math.abs(this.position.y - v.position.y) +
      Math.abs(this.position.z - v.position.z)
    );
  }
}

function day_20(puzzle) {
  const particles = puzzle.split('\n').map((p) => {
    return new Particle(...p.match(/(-?\d+)/g).map(toInt));
  });
  const middlePoint = new Particle();
  let i = 333; // Arbitrary number to find "the long run"
  while (i--) {
    const collisions = {};
    particles.forEach((p, i) => {
      p.update();
      const key = p.position.key();
      if (key in collisions) {
        particles[collisions[key]].collided = true;
        p.collided = true;
      }
      collisions[key] = i;
    });
  }
  const distances = particles.map((p) => middlePoint.distance(p));
  const answer1 = distances.indexOf(Math.min(...distances));
  const answer2 = particles.filter((p) => !p.collided).length;
  return [answer1, answer2];
}
export default {
  title: 'Particle Swarm',
  questions:
    'Which particle will stay closest to position <0,0,0> in the long term?',
  answer: day_20,
  example: [
    `p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>`,
  ],
  exampleSolutions: [3, 1],
  solutions: [157, 499],
};
