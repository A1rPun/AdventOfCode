function manhattan(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

function inRadius(a, b) {
  return manhattan(a, b) <= b.radius;
}
/*
    function factorial(n) {
        let fact = 1;
        for (var i = 2; i <= n; i++)
            fact *= i;
        return fact;
    }
    */
function day_23(puzzle) {
  const nanoBots = puzzle.split('\n').map((b) => {
    const [x, y, z, radius] = December.getNumbers(b);
    return { x, y, z, radius };
  });
  const strongestBot = nanoBots.reduce((a, b) => (a.radius > b.radius ? a : b));
  const answer1 = nanoBots.filter((x) => inRadius(x, strongestBot)).length;
  /*
        const bounds = nanoBots.reduce((acc, x) => {
            if (x.x < acc.minX) acc.minX = x.x;
            if (x.y < acc.minY) acc.minY = x.y;
            if (x.z < acc.minZ) acc.minZ = x.z;
            if (x.x > acc.maxX) acc.maxX = x.x;
            if (x.y > acc.maxY) acc.maxY = x.y;
            if (x.z > acc.maxZ) acc.maxZ = x.z;
            return acc;
        }, { minX: Infinity, minY: Infinity, minZ: Infinity, maxX: 0, maxY: 0, maxZ: 0 });
        */
  return [answer1];
}
export default {
  title: 'Experimental Emergency Teleportation',
  questions: [
    'Find the nanobot with the largest signal radius. How many nanobots are in range of its signals?',
  ],
  answer: day_23,
  example: [
    `pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`,
    /*
            `pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`,
            */
  ],
  solutions: [499],
};
