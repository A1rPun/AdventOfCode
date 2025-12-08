import Vector from '../../js/vector.js';

function setPosition(position, direction) {
  switch (direction) {
    case '^':
      position.y--;
      break;
    case '>':
      position.x++;
      break;
    case 'v':
      position.y++;
      break;
    case '<':
      position.x--;
      break;
  }
}
function day_3(puzzle) {
  var houses = { [new Vector().key()]: 2 };
  var santa = new Vector();
  var roboSanta = new Vector();

  for (var i = 0, l = puzzle.length; i < l; i++) {
    setPosition(santa, puzzle[i]);
    var key = santa.key();
    houses[key] = houses[key] ? houses[key] + 1 : 1;
    i++;
    setPosition(roboSanta, puzzle[i]);
    var key = roboSanta.key();
    houses[key] = houses[key] ? houses[key] + 1 : 1;
  }
  return [,Object.keys(houses).length];
}
export default {
  title: 'Perfectly Spherical Houses in a Vacuum',
  questions: 'How many houses receive at least one present?',
  answer: day_3,
  example: [
    {
      input: '^v^v^v^v^v',
      solutions: [,11],
    },
  ],
  solutions: [2081, 2341],
};
