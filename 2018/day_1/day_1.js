(function () {
    function day_1(puzzle) {
        return Promise.resolve();
    }
    December.addDay({
        day: 1,
        year: 2018,
        title: 'Coming soon',
        questions: 'Coming soon',
        answer: day_1,
        input: function () {
            console.log(this);
            return [];
        },
        example: function () {
            return [];
        },
    });
}());
