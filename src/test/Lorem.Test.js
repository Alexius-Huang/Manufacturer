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

    loremType.should.have.property('title', 'Lorem');
    loremType.should.have.property('resolver');
    loremType.should.have.property('unit');
    loremType.should.have.property('random');
    loremType.should.have.property('number');
    loremType.constructor.name.should.be.exactly('LoremType');
    loremType.should.not.be.exactly(Type.String.Lorem);
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
        description: Type.String.Lorem.Number(2).And.Unit('sentence')
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
        description: Type.String.Lorem.WithWords(10)
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
        description: Type.String.Lorem.WithParagraphs(3)
      });
      const person = PersonFactory.create();

      SharedTest['Match 3 Paragraphs Message'](person);
    });

    it('creates text message by changing number and units', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.WithNumber(2).WithUnit('sentence')
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });
  });

  describe('With-As Expression', () => {
    it('creates a 10-words text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.With(10).As.Words
      });
      const person = PersonFactory.create();

      SharedTest['Match 10 Words Message'](person);
    });

    it('creates a 2-sentences text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.With(2).As.Sentences
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });

    it('creates a 3-paragraph text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.With(3).As.Paragraphs
      });
      const person = PersonFactory.create();

      SharedTest['Match 3 Paragraphs Message'](person);
    });

    it('creates text message by changing number and units', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem
          .With(2).As.Number
          .With('sentence').As.Unit
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });
  });

  describe('With-Omit-As Expression', () => {
    it('creates a 10-words text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.With(10).Words()
      });
      const person = PersonFactory.create();

      SharedTest['Match 10 Words Message'](person);
    });

    it('creates a 2-sentences text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.With(2).Sentences()
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });

    it('creates a 3-paragraph text message', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem.With(3).Paragraphs()
      });
      const person = PersonFactory.create();

      SharedTest['Match 3 Paragraphs Message'](person);
    });

    it('creates text message by changing number and units', () => {
      const PersonFactory = Manufacturer.define({
        description: Type.String.Lorem
          .With(2).Number()
          .And.With('sentence').Unit()
      });
      const person = PersonFactory.create();

      SharedTest['Match 2 Sentences Message'](person);
    });
  });

  // describe('Chained Expression', () => {});
});
