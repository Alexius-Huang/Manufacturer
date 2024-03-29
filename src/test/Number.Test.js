import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

function repeat(number, callback) {
  for (let i = 0; i < number; i++) callback();
}

const SharedTest = {
  'Number Within': (result, [min, max]) => {
    result.number.should.be.a.Number().and.within(min, max);
  },
  'Number as Integer Type': (result) => {
    (result.number % 1).should.be.exactly(0);
  },
  'Number as Float Type': (result) => {
    (result.number % 1).should.not.be.exactly(0);
  },
  'Creates Float within 990 and 1000': (type) => {
    it('creates Float within 1000 and 990', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          number: type
        }).create();
        result.should.have.property('number');
        SharedTest['Number Within'](result, [990, 1000]);
        SharedTest['Number as Float Type'](result);
      });
    });
  }
}

describe('Number Type', () => {
  it('constructs new NumberType object with Type.Number', () => {
    const numberType = Type.Number;
    const attributes = Manufacturer.attributesFor(numberType);
 
    numberType.should.have.property('title', 'Number');
    numberType.should.have.property('resolver');
    attributes.should.have.property('type');
    attributes.should.have.property('max');
    attributes.should.have.property('min');
    attributes.should.have.property('positive');
    attributes.should.have.property('negative');
    attributes.should.have.property('zero');
    numberType.constructor.name.should.be.exactly('NumberType');
    numberType.should.not.be.exactly(Type.Number);

    numberType.resolve().should.be.within(-10000, 10000);
    (numberType.resolve() % 1).should.be.exactly(0);
  });

  describe('Default', () => {
    it('creates Integer within -10000 and 10000', () => {
      const TestFactory = Manufacturer.define({
        number: Type.Number
      });

      repeat(10, () => {
        const result = TestFactory.create();
        result.should.have.property('number');
        SharedTest['Number Within'](result, [-10000, 10000]);
        SharedTest['Number as Integer Type'](result);
      });
    });
  });

  describe('Direct Expression', () => {
    it('creates Integer within specific range', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          number: Type.Number.Within(50, 100)
        }).create();
        result.should.have.property('number');
        SharedTest['Number Within'](result, [50, 100]);
        SharedTest['Number as Integer Type'](result);
      });

      repeat(10, () => {
        const result = Manufacturer.define({
          number: Type.Number.Within(-100, -25)
        }).create();
        result.should.have.property('number');
        SharedTest['Number Within'](result, [-100, -25]);
        SharedTest['Number as Integer Type'](result);
      });
    });
  });

  describe('Property-Chained Expression', () => {
    it('creates Float within -10000 and 10000', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          number: Type.Number.Float
        }).create();
        result.should.have.property('number');
        SharedTest['Number Within'](result, [-10000, 10000]);
        SharedTest['Number as Float Type'](result);
      });
    });

    it('creates Negative Integer only which ranged between -10000 and 0', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          number: Type.Number.Negative
        }).create();
        result.should.have.property('number');
        SharedTest['Number Within'](result, [-10000, 0]);
        SharedTest['Number as Integer Type'](result);
      });
    });
  });

  describe('With-Trait Expression', () => {
    SharedTest['Creates Float within 990 and 1000'](
      Type.Number
        .withType('float')
        .withMaximum(1000)
        .withMinimum(990)
    );
  });

  describe('With-As Expression', () => {
    SharedTest['Creates Float within 990 and 1000'](
      Type.Number
        .with('float').as.Type
        .with(1000).be.Maximum
        .with(990).be.Minimum
    );
  });

  describe('With-Omit-As Expression', () => {
    SharedTest['Creates Float within 990 and 1000'](
      Type.Number
        .with('float').Type()
        .with(1000).Maximum()
        .with(990).Minimum()
    );
  });

  describe('Chained Expression', () => {
    it ('creates Negative Float only which ranged between -1000 and 0', () => {
      repeat(10, () => {
        const result = Manufacturer.define({
          number: Type.Number.Negative.Float.with(1000).as.Maximum
        }).create();
        result.should.have.property('number');
        SharedTest['Number Within'](result, [-1000, 0]);
        SharedTest['Number as Float Type'](result);
      });
    });
  });
});
