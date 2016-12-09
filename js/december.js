var December = (function (w) {
    var days = [];
    function noop() { return new Promise.reject(); }
    return {
        addDay: function (d) {
            d.input = d.input || noop;
            d.answer = d.answer || noop;
            d.example = d.example || noop;
            days.push(d);
        },
        getDays: function (d) {
            return days;
        }
    };
}());
