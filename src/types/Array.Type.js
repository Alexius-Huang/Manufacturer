import Type from './Type';
import ArrayResolver from '../resolvers/Array.Resolver';

const defaults = {
  length: 5,
  element: undefined
};

export default class ArrayType extends Type {
  constructor(override) {
    super('Array', ArrayResolver);
    this.attributes([
      { name: 'length', type: 'number', default: defaults.length },
      { name: 'element', type: 'any', default: defaults.element }
    ], override);

    this.BindTraitsWithPrepositions(['Length', 'Element']);
  }
}

ArrayType.UseResolver(ArrayResolver);

ArrayType.DefineBuiltInTrait('length', defaults.length);
ArrayType.DefineBuiltInTrait('element', defaults.element);
