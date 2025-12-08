import { safeAdd } from '../../js/december.js';

var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function isValid(checksum, name) {
  var commons = {};
  // Count all occurences in the name
  for (var i = 0; i < name.length; i++) {
    safeAdd(commons, name[i]);
  }
  // Create a most common checksum
  var mostCommons = [];
  for (var key in commons) mostCommons.push({ key: key, count: commons[key] });
  mostCommons = mostCommons.sort(function(a, b) {
    return b.count - a.count;
  });
  // Check if checksum and mostcommons match
  for (var i = 0; i < checksum.length; i++) {
    if (
      checksum[i] !== mostCommons[i].key &&
      !isTied(mostCommons, mostCommons[i].count, checksum[i])
    )
      return;
  }
  return true;
}
//IWishIHadThisFunctionEarlier
function isTied(mostCommons, count, check) {
  var a = mostCommons
    .filter(function(x) {
      return x.count === count;
    })
    .map(function(x) {
      return x.key;
    })
    .join('');
  return a.indexOf(check) !== -1;
}

function rotate(sectorId, name) {
  var rotated = '';
  for (var i = 0; i < name.length; i++) {
    var char = name[i];
    if (char === ' ') continue;
    var index = alpha.indexOf(char);
    if (index != -1) {
      index = (index + sectorId) % 26;
      rotated += alpha[index];
    }
  }
  return rotated;
}

function day_4(puzzle) {
  var rooms = puzzle.split('\n');
  var cipher = 'NORTHPOLEOBJECTSTORAGE';
  var ids = 0;
  var cipherSectorId = 0;
  for (var i = 0, l = rooms.length; i < l; i++) {
    var room = rooms[i].split('-');
    var part = room.pop();
    var sectorId = +part.split('[')[0];
    var checksum = part.split('[')[1].slice(0, -1);

    if (isValid(checksum, room.join(''))) ids += sectorId;

    if (rotate(sectorId, room.join(' ').toUpperCase()) === cipher)
      cipherSectorId = sectorId;
  }
  return [ids, cipherSectorId];
}

export default {
  title: 'Security Through Obscurity',
  questions: [
    'What is the sum of the sector IDs of the real rooms?',
    'What is the sector ID of the room where North Pole objects are stored?',
  ],
  answer: day_4,
  example: [
    {
      input: `aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`,
      solutions: [1514, 0],
    },
  ],
  solutions: [185371, 984],
};
