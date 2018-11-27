(function () {
    class Assembunny {
        constructor() {
            this.register = { a: 1 };
            this.multiplyCount = 0;
        }
        getValue(val) {
            return isNaN(val) ? this.register[val] || 0 : parseInt(val, 10);
        }
        set(x, y) { this.register[x] = this.getValue(y); }
        sub(x, y) { this.register[x] -= this.getValue(y); }
        mul(x, y) { this.register[x] *= this.getValue(y); this.multiplyCount++ }
        jnz(x, y) { return this.getValue(x) ? this.getValue(y) : 1; }
    }

    function day_23(puzzle) {
        puzzle = puzzle.split('\n').map(x => x.split(' '));
        const register = new Assembunny();
        for (let i = 0; i < puzzle.length;) {
            const [op, x, y] = puzzle[i];
            const addIndex = register[op](x, y);
            i += addIndex ? addIndex : 1;
        }
        return Promise.resolve(register.multiplyCount);
    }
    December.addDay({
        day: 23,
        year: 2017,
        title: 'Coprocessor Conflagration',
        questions: 'How many times is the mul instruction invoked?',
        answer: day_23,
    });
}());
