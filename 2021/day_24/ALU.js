import { toInt } from '../../js/december.js';

const INPUT = 'inp';
const ADD = 'add';
const MULTIPLY = 'mul';
const DIVIDE = 'div';
const MODULO = 'mod';
const EQUAL = 'eql';

class ALU {
  constructor(code) {
    this.pointer = 0;
    this.register = {};
    this.input = [];
    this.instructions = code
      ? code.split('\n').map((x) => {
        const [, instruction, ...args] = x.match(/(\w+) ([-|+]\d+|\w) ?([-|+]\d+|\w)?/);
        return [instruction, ...args];
      })
      : [];
  }

  run(input = []) {
    this.pointer = 0;
    this.register = {};
    this.input = input;

    while (this.pointer < this.instructions.length) {
      const [instruction, ...args] = this.instructions[this.pointer];
      this[instruction](...args);
      this.pointer++;
    }
    return this.register;
  }

  getValue(x) {
    let value = toInt(x);

    if (isNaN(x)) {
      value = this.register[x];
    }
    return value ?? 0;
  }

  [INPUT](n) {
    this.register[n] = this.input.shift();
  }
  [ADD](a, b) {
    const aa = this.getValue(a);
    const bb = this.getValue(b);

    this.register[a] = aa + bb;
  }
  [MULTIPLY](a, b) {
    const aa = this.getValue(a);
    const bb = this.getValue(b);

    this.register[a] = aa * bb;
  }
  [DIVIDE](a, b) {
    const aa = this.getValue(a);
    const bb = this.getValue(b);

    if (aa < 0 || bb < 0)
      return;

    this.register[a] = Math.floor(aa / bb);
  }
  [MODULO](a, b) {
    const aa = this.getValue(a);
    const bb = this.getValue(b);

    this.register[a] = aa % bb;
  }
  [EQUAL](a, b) {
    const aa = this.getValue(a);
    const bb = this.getValue(b);

    this.register[a] = Number(aa === bb);
  }
}

export default ALU;
