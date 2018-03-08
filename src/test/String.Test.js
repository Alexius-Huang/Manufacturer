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
    stringType.should.have.property('title', 'String');
    stringType.should.have.property('resolver');
    stringType.should.have.property('characters');
    stringType.should.have.property('characterSet');
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
        name: Type.String.WithCharacters(15)
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 15, regex: alphanumeral })(person);
    });

    it('creates a string with 10 numeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.WithCharacterSet('1234567890')
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 10, regex: numeral })(person);
    });
  });

  describe('With-As Expression', () => {
    it('creates a string with 15 alphanumeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.With(15).As.Characters
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 15, regex: alphanumeral })(person);
    });

    it('creates a string with 10 numeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.Let('1234567890').As.CharacterSet
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 10, regex: numeral })(person);
    });
  });

  describe('With-Omit-As Expression', () => {
    it('creates a string with 15 alphanumeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.With(15).Characters()
      });
      const person = PersonFactory.create();

      should.BehaveLike({ stringLength: 15, regex: alphanumeral })(person);
    });

    it('creates a string with 10 numeral characters only', () => {
      const PersonFactory = Manufacturer.define({
        name: Type.String.With('1234567890').CharacterSet()
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
          name: Type.String.Characters(15).And.CharacterSet('1234567890')
        }).create()
      );

      validate(
        Manufacturer.define({
          name: Type.String.WithCharacterSet('1234567890').And.WithCharacters(15)
        }).create()
      );

      validate(
        Manufacturer.define({
          name: Type.String.Of(15).Characters().With('1234567890').As.CharacterSet
        }).create()
      );

      validate(
        Manufacturer.define({
          name: Type.String.With('1234567890').CharacterSet().Of(15).As.Characters
        }).create()
      );

      validate(
        Manufacturer.define({
          name: Type.String.Assign('1234567890').As.CharacterSet.With(15).Characters()
        }).create()
      );
    });
  });
});
