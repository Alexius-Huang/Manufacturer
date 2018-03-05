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

    const switchProperties = {
      Positive: {
        get: () => this
          .activate('positive')
          .deactivate('negative')
      },
      Negative: {
        get: () => this
          .activate('negative')
          .deactivate('positive')
      },
      Integer: { get: () => this.switchMode('type', 'integer') },
      Float: { get: () => this.switchMode('type', 'float') }
    };

    Object.defineProperties(this, switchProperties);
    Object.defineProperties(this.As, {
      Type: { get: () => this.Type(this.cache) },
      Maximum: { get: () => this.Maximum(this.cache) },
      Minimum: { get: () => this.Minimum(this.cache) },
      ...switchProperties
    });
  }

  Between(min, max) {
    this.min = min || defaults.min;
    this.max = max || defaults.max;
    this.resetResolver();
    return this;
  }

  Within(min, max) {
    return this.Between(min, max);
  }

  Type(type) {
    this.type = type || this.cache || defaults.type;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  WithType(type) {
    return this.Type(type);
  }

  Maximum(max) {
    this.max = max || this.cache || defaults.max;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  WithMaximum(max) {
    return this.Maximum(max);
  }

  Minimum(min) {
    this.min = min || this.cache || defaults.min;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  WithMinimum(min) {
    return this.Minimum(min);
  }

  resetResolver() {
    this.resolver = () => NumberResolver(this);
  }
}