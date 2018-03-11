import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

const alphanumeral = /^[A-Za-z0-9]+$/i;
const numeral = /^[0-9]+$/i;

should.BehaveLike =
  ({ stringLength, regex }) => (person) => {
    person.should.have.property('name');
    person.name.length.should.be.exactly(stringLength);
    regex.test(person.name).should.be.exactly(true);
  };

describe('StringType', () => {
  it('constructs new StringType object with Type.String', () => {
    const stringType = Type.String;
    const attributes = Manufacturer.attributesFor(stringType);

    stringType.should.have.property('title', 'String');
    stringType.should.have.property('resolver');
    attributes.should.have.property('characters');
    attributes.should.have.property('characterSet');
    stringType.constructor.name.should.be.exactly('StringType');
    stringType.should.not.be.exactly(Type.String);

    stringType.resolve().should.be.a.String();
    stringType.resolve().length.should.be.exactly(10);
  });

  describe('default', () => {
    it('creates a string with 10 alphanumeral characters only', () => {
      const PersonFactory = Manufacturer.define({ 
        name: Type.String
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 10, regex: alphanumeral })(person);
    });
  });

  describe('Direct Expression', () => {
    it('creates a string with 15 alphanumeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.Characters(15)
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 15, regex: alphanumeral })(person);
    });

    it('creates a string with 10 numeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.CharacterSet('1234567890')
      })
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 10, regex: numeral })(person);
    });
  });

  describe('With-Trait Expression', () => {
    it('creates a string with 15 alphanumeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.withCharacters(15)
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 15, regex: alphanumeral })(person);
    });

    it('creates a string with 10 numeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.withCharacterSet('1234567890')
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 10, regex: numeral })(person);
    });
  });

  describe('With-As Expression', () => {
    it('creates a string with 15 alphanumeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.with(15).as.Characters
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 15, regex: alphanumeral })(person);
    });

    it('creates a string with 10 numeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.let('1234567890').to.be.CharacterSet
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 10, regex: numeral })(person);
    });
  });

  describe('With-Omit-As Expression', () => {
    it('creates a string with 15 alphanumeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.with(15).Characters()
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 15, regex: alphanumeral })(person);
    });

    it('creates a string with 10 numeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.with('1234567890').CharacterSet()
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 10, regex: numeral })(person);
    });
  });

  describe('Chained Expression', () => {
    it('creates a string with 15 numeral characters only', () => {
      const validate = should.BehaveLike({ stringLength: 15, regex: numeral });

      validate(
        Manufacturer.define({
          name: Type.String.Characters(15).and.CharacterSet('1234567890')
        }).create()
      );

      validate(
        Manufacturer.define({
          name: Type.String.withCharacterSet('1234567890').and.withCharacters(15)
        }).create()
      );

      validate(
        Manufacturer.define({
          name: Type.String.of(15).Characters().with('1234567890').as.CharacterSet
        }).create()
      );

      validate(
        Manufacturer.define({
          name: Type.String.with('1234567890').CharacterSet().of(15).Characters()
        }).create()
      );

      validate(
        Manufacturer.define({
          name: Type.String.assign('1234567890').as.CharacterSet.with(15).Characters()
        }).create()
      );
    });
  });
});
