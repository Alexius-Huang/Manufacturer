import Type from './Type';
import LoremResolver from '../resolvers/Lorem.Resolver';
import assign from '../helpers/assign';

const defaults = {
  unit: 'word',
  random: false,
  number: 5
};

export default class LoremType extends Type {
  constructor(options = defaults) {
    super('Lorem', LoremResolver);
    this.unit = assign('string', defaults.unit, options.unit);
    this.random = assign('boolean', defaults.random, options.random);
    this.number = assign('number', defaults.number, options.number);

    this.BindAsProperty('Random', () => this.activate('random'));
    this.BindTraitsWithPrepositions(['Unit', 'Number', 'Words', 'Sentences', 'Paragraphs']);
  }

  Words(number) {
    this.switchMode('unit', 'word');
    return this.Number(number);
  }

  withWords(number) {
    return this.Words(number);
  }

  Sentences(number) {
    this.switchMode('unit', 'sentence');
    return this.Number(number);
  }

  withSentences(number) {
    return this.Sentences(number);
  }

  Paragraphs(number) {
    this.switchMode('unit', 'paragraph')
    return this.Number(number);
  }

  withParagraphs(number) {
    return this.Paragraphs(number);
  }

  resetResolver() {
    this.resolver = () => LoremResolver(this);
  }
}

LoremType.UseResolver(LoremResolver);

LoremType.DefineBuiltInTrait('unit', defaults.unit);
LoremType.DefineBuiltInTrait('number', defaults.number);
