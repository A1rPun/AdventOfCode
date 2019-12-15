class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }

  resolve(vec) {
    return new Vector(
      this.x === vec.x ? 0 : this.x < vec.x ? 1 : -1,
      this.y === vec.y ? 0 : this.y < vec.y ? 1 : -1,
      this.z === vec.z ? 0 : this.z < vec.z ? 1 : -1
    );
  }

  size() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  key() {
    return `${this.x}-${this.y}-${this.z}`;
  }
}
