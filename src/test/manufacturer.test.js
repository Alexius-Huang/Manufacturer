import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

describe('Manufacturer', () => {
  describe('Class Methods', () => {
    describe('.attributesFor', () => {
      it('gets the attributes from `Type` object', () => {
        class TestType extends Type {
          constructor(override) {
            super('Test');
            this.attributes([
              { name: 'props1', type: 'number', default: 123 },
              { name: 'props2', type: 'string', default: 'hello' }
            ], override);
          }
        }

        const attributes = Manufacturer.attributesFor(new TestType());
        attributes.should.have.property('props1', 123);
        attributes.should.have.property('props2', 'hello');
      });

      it('can create the same `Type` object from other `Type` object using Manufacturer.attributesFor', () => {
        class TestType extends Type {
          constructor(override) {
            super('Test');
            this.attributes([
              { name: 'props1', type: 'number', default: 123 },
              { name: 'props2', type: 'string', default: 'hello' }
            ], override);
          }
        }

        const attributes = Manufacturer.attributesFor(new TestType({ props2: 'world', props1: 456 }));
        const sameKindOfType = new TestType(attributes);
        const result = Manufacturer.attributesFor(sameKindOfType);
        result.should.have.property('props1', 456);
        result.should.have.property('props2', 'world');
      });
    });
  });

  describe('Instance Methods', () => {
    describe('#extend', () => {
      beforeEach(function () {
        this.Person = Manufacturer.define({
          name: Type.String,
          age: Type.Number.Positive.Integer.Between(18, 100)
        });
      });

      it('extends the factory and create object according to the extended blueprint', function () {
        const Engineer = Manufacturer.define({ occupation: 'Engineer' });
        const engineer = this.Person.extend(Engineer).create();

        engineer.should.have.property('name');
        engineer.name.should.be.a.String();
        engineer.should.have.property('age');
        engineer.age.should.be.a.Number().and.within(18, 100);
        engineer.should.have.property('occupation', 'Engineer');
      });

      it('extends the factory and create object which can be overwritten by extended property', function () {
        const Student = Manufacturer.define({
          occupation: 'Student',
          age: Type.Number.Positive.Integer.Within(9, 21)
        });
        const student = this.Person.extend(Student).create();

        student.should.have.property('name');
        student.name.should.be.a.String();
        student.should.have.property('age');
        student.age.should.be.a.Number().and.within(9, 21);
        student.should.have.property('occupation', 'Student');
      });
    });
  });

  describe('Utility', () => {
    it('create object according to blueprint which is provided by custom function', () => {
      const Product = Manufacturer.define({
        name: Type.String,
        producedDate: () => new Date().toLocaleDateString('en-US'),
        expirationDate: () => {
          const date = new Date();
          date.setDate(date.getDate() + 14);
          return date.toLocaleDateString('en-US');
        }
      });
      const product = Product.create();

      product.should.have.property('name');
      product.name.should.be.a.String();
      product.should.have.property('producedDate');
      product.should.have.property('expirationDate');

      const durationInMilliseconds = new Date(product.expirationDate) - new Date(product.producedDate);
      const durationInDays = durationInMilliseconds / 1000 / (24 * 60 * 60);
      durationInDays.should.be.exactly(14);
    });
  });
});
