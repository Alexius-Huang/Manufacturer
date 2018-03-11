import Type from '../types/Type';
import should from 'should';

describe('Type', () => {
  describe('Setting Resolvers', function() {
    it('set resolver in constructor and use it to generate random data', function() {
      const resolver = () => 42;
      class TestType extends Type {
        constructor() {
          super('Test', resolver);
        }
      }

      new TestType().resolve().should.be.a.Number().and.be.exactly(42);
    });

    it('set resolver using Type.UseResolver method and use it to generate random data', function() {
      const resolver = () => 42;
      class TestType extends Type {
        constructor() {
          super('Test');
        }
      }

      TestType.UseResolver(resolver);
      new TestType().resolve().should.be.a.Number().and.be.exactly(42);
    });

    // it('raises error when no resolver set', () => {
    //   class TestType extends Type {
    //     constructor() {
    //       super('Test');
    //     }
    //   }
    //   new TestType().resolve().should.throw('`TestType` requires a resolver to generate data, you can provide a function which returns a value and set by class method: `UseResolver`');
    // });
  });

  describe('Extending As Property / Properties', function() {
    before(function() {
      this.TestType = class extends Type {
        constructor() {
          super('Test');
        }
      };

      this.AnotherTestType = class extends Type {
        constructor() {
          super('AnotherTest');
        }
      }
      this.TheOtherTestType = class extends Type {
        constructor() {
          super('TheOtherTest');
        }
      }
    });

    it('extends anything as property', function () {
      Type.ExtendAsProperty('Test', () => new this.TestType());
      Type.Test.title.should.be.exactly('Test');
    });

    it('extends anything as properties', function () {
      Type.ExtendAsProperties({
        AnotherTest: () => new this.AnotherTestType(),
        TheOtherTest: () => new this.TheOtherTestType()
      });
      Type.AnotherTest.title.should.be.exactly('AnotherTest');
      Type.TheOtherTest.title.should.be.exactly('TheOtherTest');
    });
  });
});
