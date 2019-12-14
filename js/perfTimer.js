var perfTimer = (function(p) {
  function perfTimer() {
    this.start();
  }
  perfTimer.prototype = {
    start: function() {
      this.begin = p.now();
    },
    stop: function() {
      this.end = p.now();
    },
    log: function() {
      return 'Execution took ' + (this.end - this.begin) + ' milliseconds.';
    },
  };
  return perfTimer;
})(performance);
