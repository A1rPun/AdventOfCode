(function () {
    function day_9(puzzle) {
        let answer1, answer2;
        let [playerCount, points] = puzzle.match(/\d+/g).map(x => parseInt(x, 10));
        let players = Array(playerCount).fill(0);
        let marbles = [0];
        let currentPlayer = 0;
        let currentMarble = 0;

        points *= 100;

        for (let marble = 1; marble <= points; marble++) {
            const earnPoint = marble % 23 === 0;
            let newMarble = (marbles.length + (earnPoint ? currentMarble - 7 : currentMarble + 2)) % (marbles.length);
            if (!newMarble) newMarble = marbles.length;
            if (earnPoint) {
                const removedMarble = marbles.splice(newMarble, 1)[0];
                players[currentPlayer] += marble + removedMarble;
            } else
                marbles.splice(newMarble, 0, marble);
            /*
            console.log(`[${currentPlayer + 1}] ${marbles.map((x, i) => {
                return i === newMarble ? `(${x})` : ('' + x).padStart(2, ' ');
            }).join(' ')}`);
            */
            currentMarble = newMarble;
            currentPlayer = (currentPlayer + 1) % players.length;

            if (marble % 10000 === 0)
                console.log(Math.max(...players));
        }

        answer1 = Math.max(...players);
        return Promise.resolve([answer1]);
    }
    December.addDay({
        day: 9,
        year: 2018,
        title: 'Marble Mania',
        questions: [
            'What is the winning Elf\'s score?',
            'What would the new winning Elf\'s score be if the number of the last marble were 100 times larger?'
        ],
        answer: day_9,
        input: '416 players; last marble is worth 71617 points',
        example: function () {
            return `9 players; last marble is worth 25 points: high score is 32`;
            //return `10 players; last marble is worth 1618 points: high score is 8317`;
            //return `13 players; last marble is worth 7999 points: high score is 146373`;
            //return `17 players; last marble is worth 1104 points: high score is 2764`;
            //return `21 players; last marble is worth 6111 points: high score is 54718`;
            //return `30 players; last marble is worth 5807 points: high score is 37305`;
        },
    });
}());

