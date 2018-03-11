# Manufacturer

## A JavaScript Factory Pattern Implementation

[![Build Status](https://travis-ci.org/Maxwell-Alexius/Manufacturer.svg?branch=master)](https://travis-ci.org/Maxwell-Alexius/Manufacturer) [![Maintainability](https://api.codeclimate.com/v1/badges/b7890341ed1eb01639b2/maintainability)](https://codeclimate.com/github/Maxwell-Alexius/Manufacturer/maintainability)

```js
import Manufacturer from 'manufacturer';
const { Type } = Manufacturer;

const Person =
  Manufacturer
    .define({
      name: Type.String,
      age: Type.Number.Positive.Integer.Between(18, 90),
      married: Type.Boolean,
      interest: Type.OneOf(['Eating', 'Coding', 'Sleeping'])
    });

const Product =
  Manufacturer
    .define({
      name: Type.String,
      price: Type.Number.Positive.Float.Between(0.01, 100),
      produceDate: Type.Time.Format('YYYY-MM-DD'),
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