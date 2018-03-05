import Type from './Type';
import BooleanType from './Boolean.Type';
import NumberType from './Number.Type';
import StringType from './String.Type';

Object.defineProperties(Type, {
  Boolean: { get: () => new BooleanType() },
  Number: { get: () => new NumberType() },
  String: { get: () => new StringType() }
});

export default Type;
