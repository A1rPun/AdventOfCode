# Try 0, see git

# Try 1

```javascript
import { sum } from '../../js/december.js';

function func(lifeTime, max, time = 0) {
  if (time === max) {
    return 1;
  } else if (lifeTime > 0) {
    return func(lifeTime - 1, max, time + 1);
  }
  return func(6, max, time + 1) + func(8, max, time + 1);
}
function countFish(fishes, max) {
  return fishes.map((x) => func(x, max)).reduce(sum);
}
```

// Try 1.337

```
const foo = (lifeTime, max) =>
  !max ? 1 : lifeTime > 0
    ? foo(lifeTime - 1, max - 1)
    : foo(6, max - 1) + foo(8, max - 1);
```

# Try 2

18 days - 26 fishes

```
// 1
// - 2
//      - 11
//      - 18
// - 9
//      - 18
// - 16

// 2
// - 3
//      - 12
// - 10
// - 17

// 3
// - 4
//      - 13
// - 11
// - 18

// 3 ...

// 4
// - 5
//      - 14
// - 12
```

```javascript
import { sum } from '../../js/december.js';

function solve(lifeTime, max) {
  let fishes = 1;

  if (lifeTime < max) {
    const length = Math.ceil((max - lifeTime) / 7);

    for (let i = 0; i < length; i++) {
      fishes += solve(lifeTime + 1 + i * 7, max - 8);
    }
  }
  return fishes;
}
function countFish(fishes, max) {
  return fishes.map((x) => solve(x, max)).reduce(sum);
}
```

# Try 3

```
// 0 1 2 3 4 5

// 0 1 1 2 1 0

// 0 1 1 2 1 0 0 0 0 0
// 0 1 1 2 1 0 0 0 1 0 1
// 0 1 1 2 1 0 0 0 1 1 1 1           day 18
// 0 1 1 2 1 0 0 0 1 1 3 1 2           |
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1         |
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0       |
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 0     |
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 0 0   V
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 0 1
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 1 1
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 1 3
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 3 3 2
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 3 5 2 2
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 3 5 3 2 1
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 3 5 3 2 1 0
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 3 5 3 2 2 0 1
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 3 5 3 2 2 1 1 1
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 3 5 3 2 2 1 5 1 4
// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 3 5 3 2 2 1 5 4 4 3

// 0 1 1 2 1 0 0 0 1 1 3 2 2 1 0 1 1 4 === 21 + 5 === 26
```

```javascript
import { safeAdd, sum } from '../../js/december.js';

function countFish(fishes, max) {
  const days = fishes.reduce((r, x) => safeAdd(r, x), {});

  for (let i = 0; i < max; i++) {
    const day = days[i];

    if (day) {
      safeAdd(days, i + 7, day);
      safeAdd(days, i + 9, day);
    }
  }
  return (
    fishes.length +
    Object.entries(days)
      .filter(([key]) => key < max)
      .map(([, val]) => val)
      .reduce(sum)
  );
}
```

# Try 4

```
// 0 1 2 3 4 5 6 7 8

// 0 1 1 2 1 0 0 0 0

// 1 1 2 1 0 0 0 0 0
// 1 2 1 0 0 0 1 0 1
// 2 1 0 0 0 1 1 1 1
// 1 0 0 0 1 1 3 1 2
// 0 0 0 1 1 3 2 2 1
// 0 0 1 1 3 2 2 1 0
// 0 1 1 3 2 2 1 0 0
// 1 1 3 2 2 1 0 0 0
// 1 3 2 2 1 0 1 0 1
// 3 2 2 1 0 1 1 1 1
// 2 2 1 0 1 1 4 1 3
// 2 1 0 1 1 4 3 3 2
// 1 0 1 1 4 3 5 2 2
// 0 1 1 4 3 5 3 2 1
// 1 1 4 3 5 3 2 1 0
// 1 4 3 5 3 2 2 0 1
// 4 3 5 3 2 2 1 1 1
// 3 5 3 2 2 1 5 1 4 === 26
```

```javascript
import { sum } from '../../js/december.js';

function countFish(fishes, max) {
  const days = Array(9).fill(0);
  fishes.forEach((fish) => days[fish]++);

  for (; max--; ) {
    days.push(days.shift());
    days[6] += days[8];
  }
  return days.reduce(sum);
}
```
