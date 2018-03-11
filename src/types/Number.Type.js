import Type from './Type';
import NumberResolver from '../resolvers/Number.Resolver';
import assign from '../helpers/assign'; 

const defaults = {
  type: 'integer',
  max: 10000,
  min: NaN,
  positive: true,
  negative: true,
  zero: true,
  decimals: 0,
};

/* TODO: Implement exclude zero */
export default class NumberType extends Type {
  constructor(options = defaults) {
    super('Number', NumberResolver);
    this.type = assign('string', defaults.type, options.type);
    this.max = assign('number', defaults.max, options.max);
    this.min = assign('number', defaults.min, options.min);
    this.positive = assign('boolean', defaults.positive, options.positive);
    this.negative = assign('boolean', defaults.negative, options.negative);
    this.zero = assign('boolean', defaults.zero, options.zero);

    this.BindAsProperties({
      Positive: () => this
        .activate('positive')
        .deactivate('negative')
      ,
      Negative: () => this
        .activate('negative')
        .deactivate('positive')
      ,
      Integer: () => this.switchMode('type', 'integer'),
      Float: () => this.switchMode('type', 'float')
    });

    this.BindTraitsWithPrepositions(['Type', 'Maximum', 'Minimum']);
  }

  Between(min, max) {
    this.min = min || defaults.min;
    this.max = max || defaults.max;
    return this;
  }

  Within(min, max) {
    return this.Between(min, max);
  }

  Maximum(max) {
    this.max = max || this.__cache__ || defaults.max;
    this.__cache__ = null;
    return this;
  }

  withMaximum(max) {
    return this.Maximum(max);
  }

  Minimum(min) {
    this.min = min || this.__cache__ || defaults.min;
    this.__cache__ = null;
    return this;
  }

  withMinimum(min) {
    return this.Minimum(min);
  }
}

NumberType.UseResolver(NumberResolver);

NumberType.DefineBuiltInTrait('type', defaults.type);
