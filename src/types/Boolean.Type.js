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
  constructor(override) {
    super('Boolean', BooleanResolver);
    this.attributes([
      { name: 'type', type: 'string', default: defaults.type },
      { name: 'probability', type: 'number', default: defaults.probability },
      { name: 'truthy', type: 'any', default: defaults.truthy },
      { name: 'falsy', type: 'any', default: defaults.falsy },
      { name: 'reversed', type: 'boolean', default: defaults.reversed }
    ], override);

    this.BindAsProperties({
      BooleanLogic: () => this.switchMode('type', 'BOOLEAN_LOGIC'),
      DigitalLogic: () => this.switchMode('type', 'DIGITAL_LOGIC'),
      CustomLogic: () => this.switchMode('type', 'CUSTOM_LOGIC'),
      Reversed: () => this.activate('reversed')
    });
    this.BindTraitsWithPrepositions(['Type', 'Probability', 'Truthy', 'Falsy']);
  }

  WithTruthyValue(value) {
    return this.Truthy(value);
  }

  WithFalsyValue(value) {
    return this.Falsy(value);
  }
}

BooleanType.UseResolver(BooleanResolver);

BooleanType.DefineBuiltInTrait('type', defaults.type);
BooleanType.DefineBuiltInTrait('probability', defaults.probability);
BooleanType.DefineBuiltInTrait('truthy', defaults.truthy);
BooleanType.DefineBuiltInTrait('falsy', defaults.falsy);
