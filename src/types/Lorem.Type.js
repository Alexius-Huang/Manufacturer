import Type from './Type';
import LoremResolver from '../resolvers/Lorem.Resolver';

const defaults = {
  unit: 'word',
  random: false,
  number: 1
};

export default class LoremType extends Type {
  constructor(options = defaults) {
    super('Lorem', LoremResolver);
    this.unit = options.unit || defaults.unit;
    this.random = (options.random !== undefined && !!options.random) || !!defaults.random;
    this.number = options.number || defaults.number;

    this.As = {
      Unit: () => this.Unit(),
      Random: () => this.Random(),
      Number: () => this.Number(),
      Words: () => this.Words(),
      Sentences: () => this.Sentences(),
      Paragraphs: () => this.Paragraphs()
    };
  }

  WithUnit(unit = 'word') {
    this.unit = unit;
    this.resetResolver();
    return this;
  }

  WithRandom(random = true) {
    this.random = !!random;
    this.resetResolver();
    return this;
  }

  WithNumber(number = 1) {
    this.number = number;
    this.resetResolver();
    return this;
  }

  WithWords(number = 1) {
    this.unit = 'word';
    return this.WithNumber();
  }

  WithSentences(number = 1) {
    this.unit = 'sentence';
    return this.WithNumber();
  }

  WithParagraphs(number = 1) {
    this.unit = 'paragraph';
    return this.WithNumber();
  }

  Unit() {
    this.unit = this.cache;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  Random() {
    this.random = this.cache;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  Number() {
    this.number = this.cache;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  Words() {
    this.unit = 'word';
    return this.Number();
  }

  Sentences(num) {
    this.unit = 'sentence';
    return this.Number();
  }

  Paragraphs() {
    this.unit = 'paragraph';
    return this.Number();
  }

  resetResolver() {
    this.resolver = () => LoremResolver(this);
  }
}
