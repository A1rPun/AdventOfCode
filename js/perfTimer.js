var timer = {
    begin: 0,
    end: 0,
    start: function () {
        this.begin = performance.now();
    },
    stop: function () {
        this.end = performance.now() - this.begin;
    },
    log: function () {
        return 'Execution took ' + this.end + ' milliseconds.';
    }
};
