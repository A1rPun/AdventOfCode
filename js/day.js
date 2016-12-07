var Day = (function (w) {
    var emptyFn = function(){};
    function Day(input, answerFn, exampleFn) {
        this.input = input;
        this.answer = answerFn || emptyFn;
        this.example = exampleFn || emptyFn;
    }
    return Day;
}());
