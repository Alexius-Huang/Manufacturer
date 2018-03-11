import Type from './Type';
import GroupResolver from '../resolvers/Group.Resolver';

const defaults = {
  values: [],
  shuffle: false,
  sample: NaN
};

export default class GroupType extends Type {
  constructor(override) {
    super('Group', GroupResolver);
    this.attributes([
      { name: 'values', type: 'array', default: defaults.values },
      { name: 'shuffle', type: 'boolean', default: defaults.shuffle },
      { name: 'sample', type: 'number', default: defaults.sample }
    ], override);

    this.BindAsProperty('Shuffle', () => this.activate('shuffle'));
    this.BindTraitsWithPrepositions(['Values', 'Sample']);
  }
}

GroupType.UseResolver(GroupResolver);

GroupType.DefineBuiltInTrait('values', defaults.values);
GroupType.DefineBuiltInTrait('sample', defaults.sample);
