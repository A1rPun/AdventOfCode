import December from '../../js/december.js';

function findInObject(obj, select, keySelect = false) {
  let match;
  let maxValue = 0;
  for (let key in obj) {
    let value = obj[key];
    let iValue = select ? select(value) : value;
    if (iValue > maxValue) {
      match = keySelect ? key : value;
      maxValue = iValue;
    }
  }
  return [match, maxValue];
}

class Guard {
  constructor(id) {
    this.id = id;
    this.asleep = 0;
    this.times = [];
  }
  addSleep(begin, end) {
    this.times.push([begin, end]);
    this.asleep += end - begin;
  }
  bestMinute() {
    const minutes = this.times.reduce((acc, curr) => {
      for (let i = curr[0], l = curr[1]; i < l; i++)
        acc[i] = acc[i] ? acc[i] + 1 : 1;
      return acc;
    }, {});
    return findInObject(minutes, null, true);
  }
}

function day_4(puzzle) {
  puzzle = puzzle.split('\n');
  const duties = puzzle.sort().map(December.getNumbers);

  const guards = {};
  let currentGuard;
  let currentTime = -1;
  duties.forEach((x) => {
    let [year, month, day, hour, minute, guard] = x;
    if (x.length === 6) {
      if (!guards[guard]) guards[guard] = new Guard(guard);
      currentGuard = guards[guard];
    } else {
      if (currentTime > -1) {
        currentGuard.addSleep(currentTime, minute);
        currentTime = -1;
      } else {
        currentTime = minute;
      }
    }
  });

  let [mostAsleep] = findInObject(guards, (x) => x.asleep);
  const answer1 = mostAsleep.id * mostAsleep.bestMinute()[0];

  let [frequentAsleep] = findInObject(guards, (x) => x.bestMinute()[1]);
  const answer2 = frequentAsleep.id * frequentAsleep.bestMinute()[0];
  return [answer1, answer2];
}
export default {
  title: 'Repose Record',
  questions:
    'What is the ID of the guard you chose multiplied by the minute you chose?',
  answer: day_4,
  example: [
    `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-05 00:45] falls asleep
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-04 00:36] falls asleep
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-05 00:55] wakes up`,
  ],
  exampleSolutions: [240, 4455],
  solutions: [99911, 65854],
};
