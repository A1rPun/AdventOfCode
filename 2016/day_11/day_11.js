(function () {
    function day_11(puzzle) {
        return Promise.resolve();
    }

    December.addDay({
        day: 11,
        title: 'Radioisotope Thermoelectric Generators',
        questions: 'What is the minimum number of steps required to bring all of the objects to the fourth floor?',
        answer: day_11,
        input: function () {
            return [
                'The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, and a strontium generator.',
                'The second floor contains a plutonium-compatible microchip and a strontium-compatible microchip.',
                'The third floor contains a promethium generator, a promethium-compatible microchip, a ruthenium generator, and a ruthenium-compatible microchip.',
                'The fourth floor contains nothing relevant.'
            ];
        },
        example: function () {
            return [
                'The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.',
                'The second floor contains a hydrogen generator.',
                'The third floor contains a lithium generator.',
                'The fourth floor contains nothing relevant.'
            ];
        }
    });
}());
