import Type from './Type';
import LoremType from './Lorem.Type';
import StringResolver from '../resolvers/String.Resolver';

const defaults = {
  characters: 10,
  characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
};

export default class StringType extends Type {
  constructor(options = defaults) {
    super('String', StringResolver);
    this.characters = options.characters || defaults.characters;
    this.characterSet = options.characterSet || defaults.characterSet;

    Object.defineProperties(this.As, {
      Characters: { get: () => this.Characters(this.cache) },
      CharacterSet: { get: () => this.CharacterSet(this.cache) }
    });
  }

  get Lorem() {
    return new LoremType();
  }

  Characters(count) {
    this.characters = count || this.cache || defaults.characters;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  WithCharacters(count) {
    return this.Characters(count);
  }

  CharacterSet(set) {
    this.characterSet = set || this.cache || defaults.characterSet;
    this.resetResolver();
    return this;
  }

  WithCharacterSet(set) {
    return this.CharacterSet(set);
  }

  resetResolver() {
    this.resolver = () => StringResolver(this);
  }
}
