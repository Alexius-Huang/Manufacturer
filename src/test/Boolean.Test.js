import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

describe('BooleanType', () => {
  it('constructs new BooleanType object with Type.Boolean', () => {
    const booleanType = Type.Boolean;

    booleanType.should.have.property('title', 'Boolean');
    booleanType.should.have.property('resolver');
    booleanType.should.have.property('type');
    booleanType.should.have.property('trueProb');
    booleanType.should.have.property('customTrue');
    booleanType.should.have.property('customFalse');
    booleanType.constructor.name.should.be.exactly('BooleanType');
    booleanType.should.not.be.exactly(Type.Boolean);    
  });
});
