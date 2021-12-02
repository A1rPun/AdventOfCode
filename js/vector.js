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

  size() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  key() {
    return `${this.x}_${this.y}_${this.z}`;
  }

  // dot(vec) {
  //   return this.x * vec.y - this.y * vec.x;
  // }

  // norm() {
  //   return Math.sqrt(this.x * this.x + this.y * this.y);
  // }

  // angle(vec) {
  //   return Math.acos(this.dot(vec) / (this.norm() * vec.norm()));
  // }
}
Vector.fromKey = (key) => new Vector(...key.split('_'));

export default Vector;
