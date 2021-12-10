# Part 1

```
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....
  6       2       5       5       4

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
  5       6       3       7       6
```

## One-liner *cough* *cough*

```javascript
// const answer1 = (puzzle) =>  puzzle.split('\n').reduce((a, b) => a + b.split(' | ')[1].split(' ').filter((x) => x.length !== 5 && x.length !== 6).length, 0);

const answer1 = (puzzle) =>
  puzzle.split('\n').reduce(
    (a, b) =>
      a +
      b
        .split(' | ')[1]
        .split(' ')
        .filter((x) => x.length !== 5 && x.length !== 6).length,
    0
  );
```

# Part 2

> acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab

```
  0:      1:      2:      3:      4:
 dddd    ....    dddd    dddd    ....
e    a  .    a  .    a  .    a  e    a
e    a  .    a  .    a  .    a  e    a
 ....    ....    ffff    ffff    ffff
g    b  .    b  g    .  .    b  .    b
g    b  .    b  g    .  .    b  .    b
 cccc    ....    cccc    cccc    ....
  6       2       5       5       4

  5:      6:      7:      8:      9:
 dddd    dddd    dddd    dddd    dddd
e    .  e    .  .    a  e    a  e    a
e    .  e    .  .    a  e    a  e    a
 ffff    ffff    ....    ffff    ffff
.    b  g    b  .    b  g    b  .    b
.    b  g    b  .    b  g    b  .    b
 cccc    cccc    ....    cccc    cccc
  5       6       3       7       6


  2:      3:      5:
 dddd    dddd    dddd
.    a  .    a  e    .
.    a  .    a  e    .
 ffff    ffff    ffff
g    .  .    b  .    b
g    .  .    b  .    b
 cccc    cccc    cccc
  5       5       5

  6:      9:      0:
 dddd    dddd    dddd
e    .  e    a  e    a
e    .  e    a  e    a
 ffff    ffff    ....
g    b  .    b  g    b
g    b  .    b  g    b
 cccc    cccc    cccc
  6       6       6

acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab

   dddd
  e    a
  e    a
   ffff
  g    b
  g    b
   cccc

ab: 1
eafb: 4
dab: 7
acedgfb: 8

gcdfa: 2
fbcad: 3
cdfbe: 5
cdfgeb: 6
cefabd: 9
cagedb: 0
```
