import Type from './Type';
import StringType from './String.Type';
import LoremType from './Lorem.Type';

Object.defineProperties(Type, {
  String: { get: () => new StringType() }
});

export default Type;
