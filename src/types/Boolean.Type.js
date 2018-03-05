import Type from './Type';
import BooleanResolver from '../resolvers/Boolean.Resolver';
import assign from '../helpers/assign';

const defaults = {
  type: 'boolean', // 'number' 0/1 or 'customized'
  trueProb: 0.5,
  customTrue: true,
  customFalse: false
};

/* TODO: Implement exclude zero */
export default class BooleanType extends Type {
  constructor(options = defaults) {
    super('Boolean', BooleanResolver);
    this.type = assign('string', defaults.type, options.type);
    this.trueProb = assign('number', defaults.trueProb, options.trueProb);
    this.customTrue = assign('any', defaults.customTrue, options.customTrue);
    this.customFalse = assign('any', defaults.customFalse, options.customFalse);

    const switchProperties = {};

    Object.defineProperties(this, switchProperties);
    Object.defineProperties(this.As, {
      ...switchProperties
    });
  }

  resetResolver() {
    this.resolver = () => BooleanResolver(this);
  }
}
