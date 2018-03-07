import Type from './Type';
import BooleanType from './Boolean.Type';
import NumberType from './Number.Type';
import StringType from './String.Type';

Type.ExtendAsProperties({
  Boolean: BooleanType,
  Number: NumberType,
  String: StringType
});

export default Type;
