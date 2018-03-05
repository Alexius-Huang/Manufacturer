import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

function repeat(number, callback) {
  for (let i = 0; i < number; i++) callback();
}

describe('BooleanType', () => {
  it('constructs new BooleanType object with Type.Boolean', () => {
    const booleanType = Type.Boolean;

    booleanType.should.have.property('title', 'Boolean');
    booleanType.should.have.property('resolver');
    booleanType.should.have.property('type');
    booleanType.should.have.property('probability');
    booleanType.should.have.property('truthy');
    booleanType.should.have.property('falsy');
    booleanType.should.have.property('reversed');
    booleanType.constructor.name.should.be.exactly('BooleanType');
    booleanType.should.not.be.exactly(Type.Boolean);    
  });

  describe('default', () => {
    it('generates true or false value randomly with equal probability', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Boolean();
      });      
    });
  });

  // describe('Direct Expression');
  // describe('Property-Chained Expression');
  // describe('With-Trait Expression');
  // describe('With-As Expression');
  // describe('With-Omit-As Expression');
  // describe('Chained Expression');
});
