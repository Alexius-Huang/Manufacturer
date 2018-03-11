import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

const SharedTest = {
  'Generates an Array with 3 Negative Numbers Ranged from 1 ~ 3': (type) => {
    it('generates array with 3 negative numbers ranged from 1 ~ 3', () => {
      const result = Manufacturer.define({
        array: type
      }).create();

      result.should.have.property('array');
      result.array.should.be.an.Array();
      result.array.length.should.be.exactly(3);
      result.array.forEach(item => item.should.be.oneOf([-1, -2, -3]));
    });
  }
}

describe('ArrayType', () => {
  it('constructs new ArrayType object with Type.Array', () => {
    const arrayType = Type.Array;
    const attributes = Manufacturer.attributesFor(arrayType);

    arrayType.should.have.property('title', 'Array');
    arrayType.should.have.property('resolver');
    attributes.should.have.property('length');
    attributes.should.have.property('element');
    arrayType.constructor.name.should.be.exactly('ArrayType');
    arrayType.should.not.be.exactly(Type.Array);

    arrayType.resolve().should.be.deepEqual(Array.from(Array(5)).map(() => undefined));
  });

  describe('default', () => {
    it('generate an array of 5 value of `undefined`', () => {
      const result = Manufacturer.define({
        array: Type.Array
      }).create();

      result.should.have.property('array');
      result.array.should.be.an.Array();
      result.array.length.should.be.exactly(5);
      result.array.should.be.deepEqual(Array.from(Array(5)).map(() => undefined));
    });
  });

  describe('Using Extended Special Method: Type.ArrayOf', () => {
    it('generate an array with 5 number with value 123', () => {
      const result = Manufacturer.define({
        array: Type.ArrayOf(123)
      }).create();
      result.should.have.property('array');
      result.array.should.be.an.Array();
      result.array.length.should.be.exactly(5);
      result.array.forEach(item => {
        item.should.be.a.Number().and.be.exactly(123);
      });
    });

    it('generate an array of 10 numbers ranged in 1 ~ 5', () => {
      const result = Manufacturer.define({
        array: Type.ArrayOf(Type.Number.Between(1, 5)).Length(10)
      }).create();
      result.should.have.property('array');
      result.array.should.be.an.Array();
      result.array.length.should.be.exactly(10);
      result.array.forEach(item => {
        item.should.be.a.Number().and.be.within(1, 5);
      });
    });

    it('generate 2-dimensional 3 X 6 array of value ranged from 5 ~ 10', () => {
      const result = Manufacturer.define({
        array: Type.ArrayOf(
          Type.ArrayOf(
            Type.Number.Between(5, 10)
          ).Length(6)
        ).Length(3)
      }).create();

      result.should.have.property('array');
      result.array.should.be.an.Array();
      result.array.length.should.be.exactly(3);
      result.array.forEach(subArray => {
        subArray.should.be.an.Array();
        subArray.length.should.be.exactly(6);
        subArray.forEach(item => {
          item.should.be.a.Number().and.be.within(5, 10);
        });
      });
    });

    it('generate custom array', () => {
      let i = 0;
      const result = Manufacturer.define({
        array: Type.ArrayOf(() => ++i).Length(10)
      }).create();

      result.should.have.property('array');
      result.array.should.be.an.Array();
      result.array.length.should.be.exactly(10);
      result.array.should.be.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe('Direct Expression', () => {
    SharedTest['Generates an Array with 3 Negative Numbers Ranged from 1 ~ 3'](
      Type.Array.Element(
        Type.Number.Negative.Integer.Between(1, 3)
      ).Length(3)
    );
  });

  // describe('Property-Chained Expression');

  describe('With-Trait Expression', () => {
    SharedTest['Generates an Array with 3 Negative Numbers Ranged from 1 ~ 3'](
      Type.Array.withElement(
        Type.Number.Negative.Integer.Between(1, 3)
      ).withLength(3)
    );
  });

  describe('With-As Expression', () => {
    SharedTest['Generates an Array with 3 Negative Numbers Ranged from 1 ~ 3'](
      Type.Array.with(
        Type.Number.Negative.Integer.Between(1, 3)
      ).as.Element.and.with(3).as.Length
    );
  });

  describe('With-Omit-As Expression', () => {
    SharedTest['Generates an Array with 3 Negative Numbers Ranged from 1 ~ 3'](
      Type.Array.with(
        Type.Number.Negative.Integer.Between(1, 3)
      ).Element().and.with(3).Length()
    );
  });

  // describe('Chained Expression');
});
