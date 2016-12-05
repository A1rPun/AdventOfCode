var December = (function (w) {
    var days = [];
    return {
        addDay: function (d) {
            days.push(d);
        },
        getDays: function (d) {
            return days;
        }
    };
}());
