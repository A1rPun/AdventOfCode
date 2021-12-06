class Fish {
  constructor(days = 8) {
    this.days = days;
  }
  tick(){
    this.days--;
    if(this.days < 0){
      this.days =6;
      return true;
    }
  }
}

export default {
  title: 'Lanternfish',
  questions: [
    'How many lanternfish would there be after 80 days?',
    ''
  ],
  answer1: (puzzle) => {
    let school = puzzle
      .split(',')
      .map(x => new Fish(x));

    for(let i = 0; i < 80; i++){
      const newFish = [];
      school.forEach(x =>{ 
        if(x.tick()){
          newFish.push(new Fish());
        }
      });
      school = [...school, ...newFish];
    }
    return school.length;
  },
  answer2: (puzzle) => {},
  example: [
    {
      input: '3,4,3,1,2',
      solutions: [5934],
    },
  ],
  solutions: [],
};

