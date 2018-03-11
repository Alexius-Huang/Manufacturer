import Type from './Type';
import GroupResolver from '../resolvers/Group.Resolver';
import assign from '../helpers/assign';

const defaults = {
  values: [],
  shuffle: false,
  sample: NaN
};

export default class GroupType extends Type {
  constructor(options = defaults) {
    super('Group', GroupResolver);
    this.values = assign('array', defaults.values, options.values);
    this.shuffle = assign('boolean', defaults.shuffle, options.shuffle);
    this.sample = assign('number', defaults.sample, options.sample);

    this.BindAsProperty('Shuffle', () => this.activate('shuffle'));
    this.BindTraitsWithPrepositions(['Values', 'Sample']);
  }
}

GroupType.UseResolver(GroupResolver);

GroupType.DefineBuiltInTrait('values', defaults.values);
GroupType.DefineBuiltInTrait('sample', defaults.sample);
