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

    this.As = {
      Characters: () => this.Characters(),
      CharacterSet: () => this.CharacterSet()
    };
  }

  get Lorem() {
    return new LoremType();
  }

  WithCharacters(count = 1) {
    this.characters = count;
    this.resetResolver();
    return this;
  }

  WithCharacterSet(set) {
    this.characterSet = set;
    this.resetResolver();
    return this;
  }

  Characters() {
    this.characters = this.cache;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  CharacterSet() {
    this.characterSet = this.cache;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  resetResolver() {
    this.resolver = () => StringResolver(this);
  }
}
