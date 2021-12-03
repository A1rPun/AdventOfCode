const tree = `|
\\|/
--*--
>o<
>O<<<
>>*>>*<
>>o>>@>*<
>>O>>o>*<<<
>>@>*>>*<<<o<
>>*>O<<@>O<o<<<
>O<@>>>O>@>>>o<<<
_ __|_|__ _`;

const mapping = {
  '\\': '<span class="yellow">\\</span>',
  '/': '<span class="yellow">/</span>',
  '|': '<span class="yellow">|</span>',
  '>': '<span class="green">&gt;</span>',
  '<': '<span class="green">&lt;</span>',
  '*': '<span class="yellow">*</span>',
  '@': '<span class="red">@</span>',
  O: '<span class="blue">O</span>',
  o: '<span class="orange">o</span>',
};

const html = tree
  .split('')
  .reduce((prev, curr) => prev + (mapping[curr] ? mapping[curr] : curr), '');

export default html;
