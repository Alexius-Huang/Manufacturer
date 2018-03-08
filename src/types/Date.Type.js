import Type from './Type';
import DateResolver from '../resolvers/Date.Resolver';
import assign from '../helpers/assign';

const defaults = {
  targetTime: null,
  startTime: null,
  endTime: null,
  after: null,
  before: null,
  type: 'CURRENT' // 'CURRENT', 'RANGED'
};

export default class DateType extends Type {
  constructor(options = defaults) {
    super('Date', DateResolver);
  }
}
