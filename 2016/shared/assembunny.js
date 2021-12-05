import { toInt } from '../../js/december.js';

class assembunny {
  constructor(register = {}) {
    this.register = register;
  }
  cpy(value, letter) {
    let x = toInt(value);

    if (isNaN(x)) {
      x = this.register[value];
    }
    this.register[letter] = x;
    return 1;
  }

  inc(letter) {
    this.register[letter]++;
    return 1;
  }

  dec(letter) {
    this.register[letter]--;
    return 1;
  }

  jnz(letter, value) {
    let x = toInt(letter);
    let y = toInt(value);

    if (isNaN(x)) {
      x = this.register[letter];
    }

    if (isNaN(y)) {
      y = this.register[value];
    }
    return x ? y : 1;
  }

  get(letter) {
    return this.register[letter];
  }
}

export default assembunny;
