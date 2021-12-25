# Day 15

```
8

8 9 1 2 3
9 1 2 3 4
1 2 3 4 5
2 3 4 5 6
3 4 5 6 7
```

Projection matrix

```
[
  [0, 1, 2, 3, 4],
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
  [3, 4, 5, 6, 7],
  [4, 5, 6, 7, 8],
]
```

```
grid
[
  [1, 2],
  [3, 4]
]

projection
[
  [0, 1],
  [1, 2],
]

result
[
  [1, 2, 2, 3],
  [3, 4, 4, 5],
  [2, 3, 3, 4],
  [4, 5, 5, 6],
]
```