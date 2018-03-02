# Manufacturer

## A JavaScript Factory Pattern Implementation

```js
import Manufacturer from 'manufacturer';
const Type = Manufacturer.Type;

const Person =
  Manufacturer
    .define({
      name: Type.String,
      age: Type.Random.Integer.Between(18, 90),
      married: Type.Boolean,
      interest: Type.OneOf(['Eating', 'Coding', 'Sleeping'])
    });

const Product =
  Manufacturer
    .define({
      name: Type.String,
      price: Type.Random.Between(0.01, 100),
      produceDate: Type.Time.Now('YYYY-MM-DD'),
      expirationDate: Type.Time.After(14, 'days', 'YYYY-MM-DD')
    });

const Store =
  Manufacturer
    .define({
      name: Type.String,
      category: Type.OneOf(['Food & Drinks', 'Electronics', 'Furniture']),
      owner: Person,
      products: Type.ArrayOf(Product)
    });

/* Create a new Store */
console.log(Store.create());
```