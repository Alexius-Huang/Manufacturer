import Type from './Type';
import LoremType from './Lorem.Type';
import StringResolver from '../resolvers/String.Resolver';
import assign from '../helpers/assign';

const defaults = {
  characters: 10,
  characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
};

export default class StringType extends Type {
  constructor(options = defaults) {
    super('String', StringResolver);
    this.characters = assign('number', defaults.characters, options.characters);
    this.characterSet = assign('string', defaults.characterSet, options.characterSet);

    this.BindTraitsWithPrepositions(['Characters', 'CharacterSet']);
  }

  get Lorem() {
    return new LoremType();
  }
}

StringType.UseResolver(StringResolver);

StringType.DefineBuiltInTrait('characters', defaults.characters);
StringType.DefineBuiltInTrait('characterSet', defaults.characterSet);
