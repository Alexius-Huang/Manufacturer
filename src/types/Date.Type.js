import Type from './Type';
import DateResolver from '../resolvers/Date.Resolver';

const defaults = {
  startTime: null,
  endTime: null,
  timeDelta: null,
  locale: 'en-US',
  format: null,
  type: 'CURRENT' // 'CURRENT', 'RANGED'
};

export default class DateType extends Type {
  constructor(override) {
    super('Date', DateResolver);
    this.attributes([
      { name: 'format', type: 'string', default: defaults.format },
      { name: 'type', type: 'string', default: defaults.type },
      { name: 'locale', type: 'string', default: defaults.locale }
    ], override);
  }
}

DateType.UseResolver(DateResolver);

DateType.DefineBuiltInTrait('format', defaults.format);
DateType.DefineBuiltInTrait('type', defaults.type);
DateType.DefineBuiltInTrait('locale', defaults.locale);
