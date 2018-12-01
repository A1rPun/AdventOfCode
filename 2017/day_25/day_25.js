(function () {
    function day_25(puzzle) {
        return Promise.resolve();
    }
    December.addDay({
        day: 25,
        year: 2017,
        title: 'The Halting Problem',
        questions: 'What is the diagnostic checksum it produces once it\'s working again?',
        answer: day_25,
        example: function () {
            return `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
    If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
    If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
    If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
    If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`;
        },
    });
}());
