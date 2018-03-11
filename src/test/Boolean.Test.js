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
    
    booleanType.resolve().should.be.oneOf([true, false]);
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

  describe('Direct Expression', () => {
    it('generates 1 or 0 value randomly with equal probability', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.Type('DIGITAL_LOGIC')
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Number();
        result.boolean.should.be.oneOf([0, 1]);
      });
    });

    it('generates custom truthy value `YES` and falsy value `NO`', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.Type('CUSTOM_LOGIC').Truthy('YES').Falsy('NO')
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.String();
        result.boolean.should.be.oneOf(['YES', 'NO']);
      });
    });

    it('generates logic result `false` value absolutely with probability 0', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.Probability(0)
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Boolean();
        result.boolean.should.be.exactly(false);
      });
    });
  });

  describe('Property-Chained Expression', () => {
    it('generates reversed logic result `false` value absolutely with probability 1', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.Reversed.Probability(1)
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Boolean();
        result.boolean.should.be.exactly(false);
      });
    });
  });

  describe('With-Trait Expression', () => {
    it('generates 1 or 0 value randomly with equal probability', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.withType('DIGITAL_LOGIC')
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Number();
        result.boolean.should.be.oneOf([0, 1]);
      });
    });

    it('generates custom truthy value `YES` and falsy value `NO`', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean
            .withType('CUSTOM_LOGIC')
            .withTruthy('YES')
            .withFalsy('NO')
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.String();
        result.boolean.should.be.oneOf(['YES', 'NO']);
      });
    });

    it('generates logic result `false` value absolutely with probability 0', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.withProbability(0)
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Boolean();
        result.boolean.should.be.exactly(false);
      });
    });
  });

  describe('With-As Expression', () => {
    it('generates 1 or 0 value randomly with equal probability', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.with('DIGITAL_LOGIC').as.Type
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Number();
        result.boolean.should.be.oneOf([0, 1]);
      });
    });

    it('generates custom truthy value `YES` and falsy value `NO`', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean
            .with('CUSTOM_LOGIC').as.Type.and
            .with('YES').as.Truthy.and
            .with('NO').as.Falsy
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.String();
        result.boolean.should.be.oneOf(['YES', 'NO']);
      });
    });

    it('generates logic result `false` value absolutely with probability 0', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.with(0).as.Probability
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Boolean();
        result.boolean.should.be.exactly(false);
      });
    });
  });

  describe('With-Omit-As Expression', () => {
    it('generates 1 or 0 value randomly with equal probability', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.with('DIGITAL_LOGIC').Type()
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Number();
        result.boolean.should.be.oneOf([0, 1]);
      });
    });

    it('generates custom truthy value `YES` and falsy value `NO`', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean
            .with('CUSTOM_LOGIC').Type().and
            .with('YES').Truthy().and
            .with('NO').Falsy()
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.String();
        result.boolean.should.be.oneOf(['YES', 'NO']);
      });
    });

    it('generates logic result `false` value absolutely with probability 0', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          boolean: Type.Boolean.with(0).Probability()
        }).create();
        result.should.have.property('boolean');
        result.boolean.should.be.a.Boolean();
        result.boolean.should.be.exactly(false);
      });
    });
  });

  // describe('Chained Expression');
});
