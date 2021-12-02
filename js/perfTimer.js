function perfTimer() {
  this.start();
}
perfTimer.prototype = {
  start: function () {
    this.begin = performance.now();
  },
  stop: function () {
    this.end = performance.now();
  },
  log: function () {
    return 'Execution took ' + (this.end - this.begin) + ' milliseconds.';
  },
};
export default perfTimer;
