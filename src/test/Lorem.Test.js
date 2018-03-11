import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

const capitalizedRegex = /[A-Z][a-z]+/;

const SharedTest = {
  'Capitalized Word When Start of New Sentence': (person) => {
    person.description.split('. ').forEach(sentence => {
      capitalizedRegex.test(sentence.split(' ')[0]).should.be.exactly(true);
    });
  },
  'Match 10 Words Message': (person) => {
    person.should.have.property('description');
    person.description.should.be.exactly('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet.');
    SharedTest['Capitalized Word When Start of New Sentence'](person);
  },
  'Match 2 Sentences Message': (person) => {
    person.should.have.property('description');
    person.description.should.be.exactly('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    SharedTest['Capitalized Word When Start of New Sentence'](person);
  },
  'Match 3 Paragraphs Message': (person) => {
    person.should.have.property('description');
    (person.description.match(/\n/g) || []).length.should.be.exactly(2);
    SharedTest['Capitalized Word When Start of New Sentence'](person);
  }
};

describe('LoremType', () => {
  it('constructs new LoremType object with Type.String.Lorem', () => {
    const loremType = Type.String.Lorem;
    const attributes = Manufacturer.attributesFor(loremType);

    loremType.should.have.property('title', 'Lorem');
    loremType.should.have.property('resolver');
    attributes.should.have.property('unit');
    attributes.should.have.property('random');
    attributes.should.have.property('number');
    loremType.constructor.name.should.be.exactly('LoremType');
    loremType.should.not.be.exactly(Type.String.Lorem);

    loremType.resolve().should.be.exactly('Lorem ipsum dolor sit amet.');
  });

  describe('default', () => {
    it('creates a 5-words text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem
      });
      const person = PersonFactory.create();

      person.should.have.property('description');
      person.description.should.be.exactly('Lorem ipsum dolor sit amet.');
      person.description.split('. ').forEach(sentence => {
        capitalizedRegex.test(sentence.split(' ')[0]).should.be.exactly(true);
      });
    });
  });

  describe('Direct Expression', () => {
    it('creates a 10-words text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.Words(10)
      });
      const person = PersonFactory.create();
 
      SharedTest['Match 10 Words Message'](person);
    });

    it('creates a 2-sentences text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.Sentences(2)
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });

    it('creates a 3-paragraph text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.Paragraphs(3)
      });
      const person = PersonFactory.create();

      SharedTest['Match 3 Paragraphs Message'](person);
    });

    it('creates text message by changing number and units', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.Number(2).and.Unit('sentence')
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });
  });

  describe('Property-Chained Expression', () => {
    it('creates random text message with other remain default settings', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.Random
      });
      const person = PersonFactory.create();

      person.should.have.property('description');
      person.description.should.not.be.exactly('Lorem ipsum dolor sit amet.');
      (person.description.match(/\s/g) || []).length.should.be.exactly(4);
      person.description.split('. ').forEach(sentence => {
        capitalizedRegex.test(sentence.split(' ')[0]).should.be.exactly(true);
      });
    });
  });

  describe('With-Trait Expression', () => {
    it('creates a 10-words text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.withWords(10)
      });
      const person = PersonFactory.create();

      SharedTest['Match 10 Words Message'](person);
    });

    it('creates a 2-sentences text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.withSentences(2)
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });

    it('creates a 3-paragraph text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.withParagraphs(3)
      });
      const person = PersonFactory.create();

      SharedTest['Match 3 Paragraphs Message'](person);
    });

    it('creates text message by changing number and units', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.withNumber(2).withUnit('sentence')
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });
  });

  describe('With-As Expression', () => {
    it('creates a 10-words text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.with(10).as.Words
      });
      const person = PersonFactory.create();

      SharedTest['Match 10 Words Message'](person);
    });

    it('creates a 2-sentences text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.with(2).as.Sentences
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });

    it('creates a 3-paragraph text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.with(3).as.Paragraphs
      });
      const person = PersonFactory.create();

      SharedTest['Match 3 Paragraphs Message'](person);
    });

    it('creates text message by changing number and units', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem
          .with(2).as.Number
          .with('sentence').as.Unit
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });
  });

  describe('With-Omit-As Expression', () => {
    it('creates a 10-words text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.with(10).Words()
      });
      const person = PersonFactory.create();

      SharedTest['Match 10 Words Message'](person);
    });

    it('creates a 2-sentences text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.with(2).Sentences()
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });

    it('creates a 3-paragraph text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.with(3).Paragraphs()
      });
      const person = PersonFactory.create();

      SharedTest['Match 3 Paragraphs Message'](person);
    });

    it('creates text message by changing number and units', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem
          .with(2).Number()
          .and.with('sentence').Unit()
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });
  });

  // describe('Chained Expression', () => {});
});
