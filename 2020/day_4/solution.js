(function() {
  December.addDay({
    day: 4,
    year: 2020,
    title: 'Passport Processing',
    questions: ['In your batch file, how many passports are valid?', ''],
    answer1: puzzle => Promise.resolve(),
    answer2: puzzle => Promise.resolve(),
    example: [
      {
        input: `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`,
        solutions: [2],
        answer: 1,
      },
    ],
    solutions: [],
  });
})();
