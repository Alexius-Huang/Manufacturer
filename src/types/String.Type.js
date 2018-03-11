import Type from './Type';
import LoremType from './Lorem.Type';
import StringResolver from '../resolvers/String.Resolver';

const defaults = {
  characters: 10,
  characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
};

export default class StringType extends Type {
  constructor(override) {
    super('String', StringResolver);
    this.attributes([
      { name: 'characters', type: 'number', default: defaults.characters },
      { name: 'characterSet', type: 'string', default: defaults.characterSet }
    ], override);

    this.BindTraitsWithPrepositions(['Characters', 'CharacterSet']);
  }

  get Lorem() {
    return new LoremType();
  }
}

StringType.UseResolver(StringResolver);

StringType.DefineBuiltInTrait('characters', defaults.characters);
StringType.DefineBuiltInTrait('characterSet', defaults.characterSet);
