export function cache(fn) {
  const cache = new Map();
  return (...args) => {
    const cacheKey = args.join('');
    if (cache.has(cacheKey)) return cache.get(cacheKey);
    const result = fn(...args);
    cache.set(cacheKey, result);
    return result;
  };
}

export function count(str, char) {
  return (str.match(new RegExp(char, 'g')) || []).length;
}

export function getNumbers(str) {
  return str.match(/-?\d+/g).map(toInt);
}

export function log(...args) {
  // console.log(...args);
}

export function prettify(jagged, char) {
  var result = '';
  char = char || '';
  for (var i = 0; i < jagged.length; i++) result += jagged[i].join(char) + '\n';
  return result;
}

export function range(max, min = 0, mapFn) {
  const fn = mapFn ? (_, i) => mapFn(i + min) : (_, i) => i + min;
  return Array.from(Array(max), fn);
}

// Rotate + = left, - = right
export function rotate(arr, n) {
  return arr.slice(n, arr.length).concat(arr.slice(0, n));
}

export const sum = (a, b) => a + b;

export function toInt(n) {
  return parseInt(n, 10);
}
