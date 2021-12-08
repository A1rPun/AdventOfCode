import {
  hundredDigit,
  largestCell,
} from './solution.js';

const rackId = (x) => x + 10;
const powerLevel = (rackId, y) => rackId * y;
const addSerial = (serial, power) => serial + power;
const mulRackId = (rackId, power) => rackId * power;
const sub5 = (power) => power - 5;
const getPowerLevel = (x, y, serial) => {
  const id = rackId(x);
  let power = powerLevel(id, y);
  power = addSerial(serial, power);
  power = mulRackId(id, power);
  power = hundredDigit(power);
  return sub5(power);
};

test('rackId', () => {
  expect(rackId(3)).toBe(13);
});

test('powerLevel', () => {
  expect(powerLevel(13, 5)).toBe(65);
});

test('addSerial', () => {
  expect(addSerial(65, 8)).toBe(73);
});

test('mulRackId', () => {
  expect(mulRackId(73, 13)).toBe(949);
});

test('hundreds digit', () => {
  expect(hundredDigit(959)).toBe(9);
});

test('sub5', () => {
  expect(sub5(9)).toBe(4);
});

test('getPowerLevel 1', () => {
  expect(getPowerLevel(3, 5, 8)).toBe(4);
});

test('getPowerLevel 2', () => {
  expect(getPowerLevel(122, 79, 57)).toBe(-5);
});

test('getPowerLevel 3', () => {
  expect(getPowerLevel(217, 196, 39)).toBe(0);
});

test('getPowerLevel 4', () => {
  expect(getPowerLevel(101, 153, 71)).toBe(4);
});

test('largest total 1', () => {
  const cell = largestCell(18, 3);
  expect(cell.x).toBe(33);
  expect(cell.y).toBe(45);
});

test('largest total 2', () => {
  const cell = largestCell(42, 3);
  expect(cell.x).toBe(21);
  expect(cell.y).toBe(61);
});
