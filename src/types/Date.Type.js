import Type from './Type';
import DateResolver from '../resolvers/Date.Resolver';
import assign from '../helpers/assign';

const defaults = {
  startTime: null,
  endTime: null,
  timeDelta: null,
  locale: 'en-US',
  format: null,
  type: 'CURRENT' // 'CURRENT', 'RANGED'
};

export default class DateType extends Type {
  constructor(options = defaults) {
    super('Date', DateResolver);
    this.format = assign('string', defaults.format, options.format);
    this.type = assign('string', defaults.type, options.type);
    this.locale = assign('string', defaults.locale, options.locale);
  }
}

DateType.UseResolver(DateResolver);

DateType.DefineBuiltInTrait('format', defaults.format);
DateType.DefineBuiltInTrait('type', defaults.type);
DateType.DefineBuiltInTrait('locale', defaults.locale);
