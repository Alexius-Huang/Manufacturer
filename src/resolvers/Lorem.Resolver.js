import Lorem from '../lorem/lorem';

export default function LoremResolver(options = {
  unit: 'word',
  random: false,
  number: 5
}) {
  const { unit, random, number } = options;
  switch (unit) {
    case 'word':
      return random ? Lorem.Random.Word(number) : Lorem.Word(number);
    case 'sentence':
      return random ? Lorem.Random.Sentence(number) : Lorem.Sentence(number);
    case 'paragraph':
      return random ? Lorem.Random.Paragraph(number) : Lorem.Paragraph(number);
  }
}
