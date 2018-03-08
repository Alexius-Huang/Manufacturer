import Type from './Type';

import ArrayType from './Array.Type';
import BooleanType from './Boolean.Type';
import GroupType from './Group.Type';
import NumberType from './Number.Type';
import StringType from './String.Type';

Type.ExtendAsProperties({
  Array: () => new ArrayType(),
  Boolean: () => new BooleanType(),
  Group: () => new GroupType(),
  Number: () => new NumberType(),
  String: () => new StringType()
});

Type.ExtendAsClassMethods({
  ArrayOf: something => new ArrayType({ element: something }),
  GroupOf: arrayOfValues => new GroupType({ values: arrayOfValues }),
  OneOf: arrayOfValues => new GroupType({ values: arrayOfValues, sample: 1 })
});

export default Type;
