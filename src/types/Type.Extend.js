import Type from './Type';

import ArrayType from './Array.Type';
import BooleanType from './Boolean.Type';
import DateType from './Date.Type';
import GroupType from './Group.Type';
import NumberType from './Number.Type';
import StringType from './String.Type';

import uuid from '../helpers/uuid';

Type
  .ExtendAsProperties({
    Array: () => new ArrayType(),
    Boolean: () => new BooleanType(),
    Date: () => new DateType(),
    Group: () => new GroupType(),
    Number: () => new NumberType(),
    String: () => new StringType(),
    UUID: () => uuid
  })
  .ExtendAsClassMethods({
    ArrayOf: something => new ArrayType({ element: something }),
    GroupOf: arrayOfValues => new GroupType({ values: arrayOfValues }),
    OneOf: arrayOfValues => new GroupType({ values: arrayOfValues, sample: 1 })
  });

export default Type;
