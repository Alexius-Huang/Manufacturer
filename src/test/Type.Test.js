import Type from '../types/Type';
import should from 'should';

describe('Type', () => {
  describe('Setting Resolvers', () => {
    it('set resolver in constructor and use it to generate random data', () => {
      const resolver = () => 42;
      class TestType extends Type {
        constructor() {
          super('Test', resolver);
        }
      }

      new TestType().resolve().should.be.a.Number().and.be.exactly(42);
    });

    it('set resolver using Type.UseResolver method and use it to generate random data', () => {
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
});
