import Type from './Type';

import ArrayType from './Array.Type';
import BooleanType from './Boolean.Type';
import NumberType from './Number.Type';
import StringType from './String.Type';

Type.ExtendAsProperties({
  Array: () => new ArrayType(),
  Boolean: () => new BooleanType(),
  Number: () => new NumberType(),
  String: () => new StringType()
});

Type.ExtendAsClassMethods({
  ArrayOf: something => new ArrayType({ element: something })
});

export default Type;
