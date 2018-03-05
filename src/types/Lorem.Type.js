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

    const switchProperties = {
      Random: { get: () => this.activate('random') },
    };

    Object.defineProperties(this, switchProperties);
    Object.defineProperties(this.As, {
      Unit: { get: () => this.Unit(this.cache) },
      Number: { get: () => this.Number(this.cache) },
      Words: { get: () => this.Words(this.cache) },
      Sentences: { get: () => this.Sentences(this.cache) },
      Paragraphs: { get: () => this.Paragraphs(this.cache) },
      ...switchProperties
    });
  }

  Words(number) {
    this.unit = 'word';
    return this.Number(number);
  }

  WithWords(number) {
    return this.Words(number);
  }

  Sentences(number) {
    this.unit = 'sentence';
    return this.Number(number);
  }

  WithSentences(number) {
    return this.Sentences(number);
  }

  Paragraphs(number) {
    this.unit = 'paragraph';
    return this.Number(number);
  }

  WithParagraphs(number) {
    return this.Paragraphs(number);
  }

  resetResolver() {
    this.resolver = () => LoremResolver(this);
  }
}

LoremType.UseResolver(LoremResolver);

LoremType.DefineBuiltInTrait('unit', defaults.unit);
LoremType.DefineBuiltInTrait('number', defaults.number);
