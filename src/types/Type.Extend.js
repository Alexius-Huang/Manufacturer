import Type from './Type';
import StringType from './String.Type';
import NumberType from './Number.Type';

Object.defineProperties(Type, {
  String: { get: () => new StringType() },
  Number: { get: () => new NumberType() }
});

export default Type;
