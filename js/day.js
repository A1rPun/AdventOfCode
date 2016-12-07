var Day = (function (w) {
    var emptyFn = function(){};
    function Day() {
        if (arguments[0]) for (var prop in arguments[0]) this[prop] = arguments[0][prop];
        this.input = this.input || emptyFn;
        this.answer = this.answer || emptyFn;
        this.example = this.example || emptyFn;
    }
    return Day;
}());
