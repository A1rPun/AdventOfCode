class Device {
  constructor(memory) {
    this.memory = memory || [0, 0, 0, 0];
  }
  addr(a, b, c) {
    this.memory[c] = this.memory[a] + this.memory[b];
  }
  addi(a, b, c) {
    this.memory[c] = this.memory[a] + b;
  }
  mulr(a, b, c) {
    this.memory[c] = this.memory[a] * this.memory[b];
  }
  muli(a, b, c) {
    this.memory[c] = this.memory[a] * b;
  }
  banr(a, b, c) {
    this.memory[c] = this.memory[a] & this.memory[b];
  }
  bani(a, b, c) {
    this.memory[c] = this.memory[a] & b;
  }
  borr(a, b, c) {
    this.memory[c] = this.memory[a] | this.memory[b];
  }
  bori(a, b, c) {
    this.memory[c] = this.memory[a] | b;
  }
  setr(a, _, c) {
    this.memory[c] = this.memory[a];
  }
  seti(a, _, c) {
    this.memory[c] = a;
  }
  gtir(a, b, c) {
    this.memory[c] = a > this.memory[b] ? 1 : 0;
  }
  gtri(a, b, c) {
    this.memory[c] = this.memory[a] > b ? 1 : 0;
  }
  gtrr(a, b, c) {
    this.memory[c] = this.memory[a] > this.memory[b] ? 1 : 0;
  }
  eqir(a, b, c) {
    this.memory[c] = a === this.memory[b] ? 1 : 0;
  }
  eqri(a, b, c) {
    this.memory[c] = this.memory[a] === b ? 1 : 0;
  }
  eqrr(a, b, c) {
    this.memory[c] = this.memory[a] === this.memory[b] ? 1 : 0;
  }
}

export default Device;
