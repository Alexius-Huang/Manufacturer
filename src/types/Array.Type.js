import Type from './Type';
import ArrayResolver from '../resolvers/Array.Resolver';
import assign from '../helpers/assign';

const defaults = {
  length: 5,
  element: undefined
};

export default class ArrayType extends Type {
  constructor(options = defaults) {
    super('Array', ArrayResolver);
    this.length = assign('number', defaults.length, options.length);
    this.element = assign('any', defaults.element, options.element);

    /* TODO: Should Figure out to Remove this */
    this.resetResolver();

    this.BindTraitsWithPrepositions(['Length', 'Element']);
  }
}

ArrayType.UseResolver(ArrayResolver);

ArrayType.DefineBuiltInTrait('length', defaults.length);
ArrayType.DefineBuiltInTrait('element', defaults.element);
