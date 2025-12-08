class perfTimer {
  constructor() {
    this.start();
  }
  start() {
    this.begin = performance.now();
  }
  stop() {
    this.end = performance.now();
  }
  log() {
    return 'Execution took ' + (this.end - this.begin) + ' milliseconds.';
  }
}
export default perfTimer;
