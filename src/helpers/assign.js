import * as _ from './is';

export default function assign(type, defaultValue, value) {
  switch (type) {
    case 'boolean':
      if (_.isBoolean(value)) return value;
      return defaultValue;
    case 'number':
      if (_.isNumber(value)) return value;
      return defaultValue;
    case 'string':
      if (_.isString(value)) return value;
      return defaultValue;
    case 'function':
      if (_.isFunction(value)) return value;
      return defaultValue;
  }
};
