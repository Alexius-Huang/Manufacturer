import Type from './Type';
import NumberResolver from '../resolvers/Number.Resolver';

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
  constructor(override) {
    super('Number', NumberResolver);
    this.attributes([
      { name: 'type', type: 'string', default: defaults.type },
      { name: 'max', type: 'number', default: defaults.max },
      { name: 'min', type: 'number', default: defaults.min },
      { name: 'positive', type: 'boolean', default: defaults.positive },
      { name: 'negative', type: 'boolean', default: defaults.negative },
      { name: 'zero', type: 'boolean', default: defaults.zero }
    ], override);

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
    this.__namespaced_store__.min = min || defaults.min;
    this.__namespaced_store__.max = max || defaults.max;
    return this;
  }

  Within(min, max) {
    return this.Between(min, max);
  }

  Maximum(max) {
    this.__namespaced_store__.max = max || this.__cache__ || defaults.max;
    this.__cache__ = null;
    return this;
  }

  withMaximum(max) {
    return this.Maximum(max);
  }

  Minimum(min) {
    this.__namespaced_store__.min = min || this.__cache__ || defaults.min;
    this.__cache__ = null;
    return this;
  }

  withMinimum(min) {
    return this.Minimum(min);
  }
}

NumberType.UseResolver(NumberResolver);

NumberType.DefineBuiltInTrait('type', defaults.type);
