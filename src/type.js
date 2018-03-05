// import Faker from 'faker';
// import Moment from 'moment';
// import { isManufacturer } from './helpers/is';

// Type.Number = () => BasicTypes.ra;
// Type.Boolean = () => Faker.random.boolean();
// Type.UUID = () => Faker.random.uuid();

// Type.Shape = childBlueprint => new Manufacturer(childBlueprint);

// Type.ArrayOf = (type, options) => {
//   let elementCount;
//   if (options && options.number && options.number instanceof Number) {
//     elementCount = options.number;
//   } else {
//     /* Default is 5 elements */
//     elementCount = 5;
//   }

//   return () =>
//     Array
//       .from(Array(elementCount))
//       .map(() => (isManufacturer(type) ? type.create() : type() ));
// };

// Type.OneOf = (options) => {
//   if (options instanceof Array) {
//     return () => Faker.helpers.randomize(options);
//   }
//   throw new Error(`Manufacturer.Type.OneOf should accept Array. Got: ${typeof options}`);
// };

// Type.Shuffle = (array) => {
//   if (array instanceof Array) {
//     return () => Faker.helpers.shuffle(array);
//   }
//   throw new Error(`Manufacturer.Type.Shuffle should accept Array. Got: ${typeof array}`);
// };

// /* Random */
// Type.Random = () => Math.random();
// Type.Random.Between = (min, max) =>
//   () => Math.random() * (max - min) + min;
// Type.Random.Integer = () => Faker.random.number();
// Type.Random.Integer.Between = (min, max) =>
//   () => Math.floor(Math.random() * (max - min + 1)) + min;

// /* Time Integration with MomentJS */
// Type.Time = (timeString, format) => Moment(timeString, format);
// Type.Time.Now = format => Moment().format(format);
// Type.Time.After = (number, unit, format) => Moment().add(number, unit).format(format);
// Type.Time.Before = (number, unit, format) => Moment().subtract(number, unit).format(format);

// Type.Timestamp = time => Moment(time).unix();
// Type.Timestamp.Now = () => Moment().unix();

// Type.ID = function incrementIdentity() {
//   return this.idCounter;
// };

// export default Type;
