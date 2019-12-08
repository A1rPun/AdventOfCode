(function() {
  function answer(input, movePlanets) {
    const planetMap = input.reduce((acc, cur) => {
      const [planet, orbit] = cur.split(')');

      if (!acc[planet]) {
        acc[planet] = {
          name: planet,
          childs: [orbit],
          parent: null,
        };
      } else {
        acc[planet].childs.push(orbit);
      }

      if (!acc[orbit]) {
        acc[orbit] = {
          name: orbit,
          childs: [],
          parent: planet,
        };
      } else {
        acc[orbit].parent = planet;
      }
      return acc;
    }, {});

    const rootPlanet = Object.values(planetMap).find(x => !x.parent);

    const getOrbits = (planet, orbits) => {
      let result = planet.parent ? orbits + 1 : orbits;
      if (planet.childs.length) {
        for (let i = 0; i < planet.childs.length; i++) {
          const element = planet.childs[i];
          result += getOrbits(
            planetMap[element],
            planet.parent ? orbits + 1 : orbits
          );
        }
      }
      return result;
    };

    const totalOrbits = getOrbits(rootPlanet, 0);

    const paths = movePlanets.map(x => {
      let planet = planetMap[x];
      let path = [planet];
      while (planet.parent) {
        planet = planetMap[planet.parent];
        path = [planet, ...path];
      }
      return path.map(x => x.name);
    });

    // TODO: Refactor this nasty bit for part 2.. maybe also refactor part 1
    let sameOrbitalTransfers = 0;
    for (let i = 1; i < paths[0].length; i++) {
      const element = paths[0][i];
      const element2 = paths[1][i];
      if (element === element2) {
        sameOrbitalTransfers++;
      } else {
        break;
      }
    }
    let orbitalTransfers = 0;
    orbitalTransfers += paths[0].length - 2 - sameOrbitalTransfers;
    orbitalTransfers += paths[1].length - 2 - sameOrbitalTransfers;

    return [totalOrbits, orbitalTransfers];
  }

  December.addDay({
    day: 6,
    year: 2019,
    title: 'Universal Orbit Map',
    questions: [
      'What is the total number of direct and indirect orbits in your map data?',
      'What is the minimum number of orbital transfers required to move from the object YOU are orbiting to the object SAN is orbiting?',
    ],
    answer: puzzle => {
      const planets = puzzle.split('\n');
      return Promise.resolve(answer(planets, ['YOU', 'SAN']));
    },
    example: () => `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`,
    solutions: [358244, 517],
  });
})();
