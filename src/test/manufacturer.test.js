// const Manufacturer = require('./build/manufacturer.bundle.js');
import Manufacturer from '../manufacturer';
const Type = Manufacturer.Type;

// console.log(Type);
const Person =
  Manufacturer
    .define({
      name: Type.String.With(10).As.Characters,
      age: Type.Number
        .With('integer').As.Type
        .Negative.Between(1, 100),
      // married: Type.Boolean,
      // interest: Type.OneOf(['Eating', 'Coding', 'Sleeping'])
    });

// const Product =
//   Manufacturer
//     .define({
//       name: Type.String,
//       price: Type.Random.Between(0.01, 100),
//       produceDate: Type.Time.Now('YYYY-MM-DD'),
//       expirationDate: Type.Time.After(14, 'days', 'YYYY-MM-DD')
//     });

const Store =
  Manufacturer
    .define({
      name: Type.String.Of(5).Characters().WithCharacterSet('AbCdE'),
      description:
        // Type.String.Lorem.Sentences(5),
        // Type.String.Lorem.WithSentences(5),
        // Type.String.Lorem.Of(5).Sentences(),
        Type.String.Lorem.Of(5).Random.Sentences(),
        // Type.String.Lorem.With(5).Sentences(),
        // Type.String.Lorem.With(5).Random.Sentences(),
        // Type.String.Lorem.With(5).As.Sentences,
        // Type.String.Lorem.Of(5).As.Sentences,
        // Type.String.Lorem.With(5).As.Number,

        //category: Type.OneOf(['Food & Drinks', 'Electronics', 'Furniture']),
      owner: Person,
//       products: Type.ArrayOf(Product)
    });

console.log(Store.create());