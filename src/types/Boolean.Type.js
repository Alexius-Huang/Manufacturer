import Type from './Type';
import BooleanResolver from '../resolvers/Boolean.Resolver';
import assign from '../helpers/assign';

const defaults = {
  type: 'BOOLEAN_LOGIC', // 'DIGITAL_LOGIC' 0/1 or 'CUSTOM_LOGIC'
  probability: 0.5,
  truthy: true,
  falsy: false,
  reversed: false
};

/* TODO: Implement exclude zero */
export default class BooleanType extends Type {
  constructor(options = defaults) {
    super('Boolean', BooleanResolver);
    this.type = assign('string', defaults.type, options.type);
    this.probability = assign('number', defaults.probability, options.probability);
    this.truthy = assign('any', defaults.truthy, options.truthy);
    this.falsy = assign('any', defaults.falsy, options.falsy);
    this.reversed = assign('boolean', defaults.reversed, options.reversed);

    const switchProperties = {
      BooleanLogic: { get: () => this.switchMode('type', 'BOOLEAN_LOGIC') },
      DigitalLogic: { get: () => this.switchMode('type', 'DIGITAL_LOGIC') },
      CustomLogic: { get: () => this.switchMode('type', 'CUSTOM_LOGIC') },
      Reversed: { get: () => this.activate('reversed') }
    };

    Object.defineProperties(this, switchProperties);
    Object.defineProperties(this.As, {
      ...switchProperties
    });
  }

  // Type(type) {
  //   this.type = type || this.cache || defaults.type;
  //   this.cache = null;
  //   this.resetResolver();
  //   return this;
  // }

  // WithType(type) {
  //   return this.Type(type);
  // }

  Probability(num) {
    this.probability = num || this.cache || defaults.probability;
    this.cache = null;
    this.resetResolver();
    return this;
  }

  WithProbability(num) {
    return this.Probability(num);
  }

  // Truthy(value) {
  //   this.truthy = value || this.cache || defaults.truthy;
  //   this.cache = null;
  //   this.resetResolver();
  //   return this;
  // }

  // WithTruthy(value) {
  //   return this.Truthy(value);
  // }

  WithTruthyValue(value) {
    return this.Truthy(value);
  }

  // Falsy(value) {
  //   this.falsy = value || this.cache || defaults.falsy;
  //   this.cache = null;
  //   this.resetResolver();
  //   return this;
  // }

  // WithFalsy(value) {
  //   return this.Falsy(value);
  // }

  WithFalsyValue(value) {
    return this.Falsy(value);
  }
}

BooleanType.UseResolver(BooleanResolver);

BooleanType.DefineBuiltInTrait('type', defaults.type);
BooleanType.DefineBuiltInTrait('probability', defaults.probability);
BooleanType.DefineBuiltInTrait('truthy', defaults.truthy);
BooleanType.DefineBuiltInTrait('falsy', defaults.falsy);
