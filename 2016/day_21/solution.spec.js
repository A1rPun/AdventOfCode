import { scramble } from './solution.js';

const input = 'abcde'.split('');
const testFn = (line) => scramble(line, input);

test('swap 1', () => {
  const line = 'swap position 4 with position 0';
  expect(testFn(line)).toBe('ebcda');
});

test('swap 2', () => {
  const line = 'swap letter d with letter b';
  expect(testFn(line)).toBe('adcbe');
});

test('reverse', () => {
  const line = 'reverse positions 0 through 4';
  expect(testFn(line)).toBe('edcba');
});

test('rotate', () => {
  const line = 'rotate left 1 step';
  expect(testFn(line)).toBe('bcdea');
});

test('move', () => {
  const line = 'move position 1 to position 4';
  expect(testFn(line)).toBe('acdeb');
});

test('move', () => {
  const line = 'move position 3 to position 0';
  expect(testFn(line)).toBe('dabce');
});

test('rotate', () => {
  const line = 'rotate based on position of letter b';
  expect(testFn(line)).toBe('deabc');
});

test('rotate', () => {
  const line = 'rotate based on position of letter d';
  expect(testFn(line)).toBe('bcdea');
});
