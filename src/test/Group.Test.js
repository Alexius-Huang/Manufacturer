import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

function repeat(number, callback) {
  for (let i = 0; i < number; i++) callback();
}

const FRUITS = ['Apple', 'Banana', 'Strawberry', 'Grape', 'Mango'];

const SharedTest = {
  'Creates Group of Fruits': type => {
    repeat(10, () => {
      const result = Manufacturer.define({ fruits: type }).create();

      result.should.have.property('fruits');
      result.fruits.should.be.an.Array().and.be.deepEqual(FRUITS);
    });
  },
  'Creates Group of 5 Random Lorem Word': type => {
    repeat(10, () => {
      const result = Manufacturer.define({ loremWords: type }).create();

      result.should.have.property('loremWords');
      result.loremWords.should.be.an.Array();
      result.loremWords.length.should.be.exactly(5);
      result.loremWords.forEach(item => item.should.be.a.String());
    });
  },
  'Get One Fruit from Group of Fruits': type => {
    repeat(10, () => {
      const result = Manufacturer.define({ fruit: type }).create();

      result.should.have.property('fruit');
      result.fruit.should.be.a.String().and.equalOneOf(FRUITS);
    });
  },
  'Get 3 Fruits from Group of Fruits': type => {
    repeat(10, () => {
      const result = Manufacturer.define({ fruits: type }).create();

      result.should.have.property('fruits');
      result.fruits.should.be.an.Array();
      new Set(result.fruits).size.should.be.exactly(3);
      result.fruits.forEach(fruit => fruit.should.be.equalOneOf(FRUITS));
    });
  }
}

describe('GroupType', () => {
  it('constructs new GroupType object with Type.Group', () => {
    const groupType = Type.Group;
    groupType.should.have.property('title', 'Group');
    groupType.should.have.property('resolver');
    groupType.should.have.property('values');
    groupType.should.have.property('shuffle');
    groupType.should.have.property('sample');
    groupType.constructor.name.should.be.exactly('GroupType');
    groupType.should.not.be.exactly(Type.Group);

    groupType.resolve().should.be.deepEqual([]);
  });

  describe('Default', () => {
    before(function() {
      this.fruits = ['Apple', 'Banana', 'Strawberry', 'Grape', 'Mango'];
    });

    it('create empty array if no trait specified', function() {
      repeat(10, () => {
        const result = Manufacturer.define({
          fruits: Type.Group
        }).create();

        result.should.have.property('fruits');
        result.fruits.should.be.deepEqual([]);
      });
    });

    it('uses GroupOf built-in class property to create group of values', function() {
      repeat(10, () => {
        const result = Manufacturer.define({
          fruits: Type.GroupOf(this.fruits)
        }).create();

        result.should.have.property('fruits');
        result.fruits.should.be.deepEqual(this.fruits);
      });
    });

    it('uses OneOf built-in class property to create group and sample only one value', function() {
      repeat(10, () => {
        const result = Manufacturer.define({
          fruit: Type.OneOf(this.fruits)
        }).create();

        result.should.have.property('fruit');
        result.fruit.should.be.a.String().and.equalOneOf(this.fruits);
      });
    });
  });

  describe('Direct Expression', () => {
    it('creates a group of values', function() {
      SharedTest['Creates Group of Fruits'](
        Type.Group.Values(FRUITS)
      );
    });

    it('creates a group of values using ArrayType object instance', function() {
      SharedTest['Creates Group of 5 Random Lorem Word'](
        Type.Group.Values(
          Type.ArrayOf(Type.String.Lorem.Random.Words(1))
        )
      );
    });

    it('gets a sample from a group of values', function() {
      SharedTest['Get One Fruit from Group of Fruits'](
        Type.Group.Values(FRUITS).Sample(1)
      );
    });

    it('gets 3 samples from a group of items', function() {
      SharedTest['Get 3 Fruits from Group of Fruits'](
        Type.Group.Values(FRUITS).Sample(3)
      );
    });
  });

  describe('Property-Chained Expression', () => {
    before(function() {
      this.numbers = Array.from(Array(20)).map((_, i) => i);
    });

    it('creates a group not deep equal to but shuffled values', function() {
      repeat(10, () => {
        const result = Manufacturer.define({
          shuffledNumbers: Type.Group.Values(this.numbers).Shuffle
        }).create();

        result.should.have.property('shuffledNumbers');
        result.shuffledNumbers.should.be.an.Array();
        new Set(result.shuffledNumbers).size.should.be.exactly(20);
        result.shuffledNumbers.should.not.be.deepEqual(this.numbers);

        let testArray = Array(20);
        result.shuffledNumbers.forEach(number => {
          testArray[number] = number;
        });
        testArray.should.be.deepEqual(this.numbers);
      });
    });
  });

  describe('With-Trait Expression', () => {
    it('creates a group of values', function () {
      SharedTest['Creates Group of Fruits'](
        Type.Group.withValues(FRUITS)
      );
    });

    it('creates a group of values using ArrayType object instance', function () {
      SharedTest['Creates Group of 5 Random Lorem Word'](
        Type.Group.withValues(
          Type.ArrayOf(Type.String.Lorem.Random.withWords(1))
        )
      );
    });

    it('gets a sample from a group of values', function () {
      SharedTest['Get One Fruit from Group of Fruits'](
        Type.Group.withValues(FRUITS).withSample(1)
      );
    });

    it('gets 3 samples from a group of items', function () {
      SharedTest['Get 3 Fruits from Group of Fruits'](
        Type.Group.withValues(FRUITS).withSample(3)
      );
    });
  });

  describe('With-As Expression', () => {
    it('creates a group of values', function () {
      SharedTest['Creates Group of Fruits'](
        Type.Group.with(FRUITS).as.Values
      );
    });

    it('creates a group of values using ArrayType object instance', function () {
      SharedTest['Creates Group of 5 Random Lorem Word'](
        Type.Group.with(
          Type.ArrayOf(Type.String.Lorem.Random.withWords(1))
        ).as.Values
      );
    });

    it('gets a sample from a group of values', function () {
      SharedTest['Get One Fruit from Group of Fruits'](
        Type.Group.with(FRUITS).as.Values.with(1).as.Sample
      );
    });

    it('gets 3 samples from a group of items', function () {
      SharedTest['Get 3 Fruits from Group of Fruits'](
        Type.Group.with(FRUITS).as.Values.with(3).as.Sample
      );
    });
  });

  describe('With-Omit-As Expression', () => {
    it('creates a group of values', function () {
      SharedTest['Creates Group of Fruits'](
        Type.Group.with(FRUITS).Values()
      );
    });

    it('creates a group of values using ArrayType object instance', function () {
      SharedTest['Creates Group of 5 Random Lorem Word'](
        Type.Group.with(
          Type.ArrayOf(Type.String.Lorem.Random.with(1).Words())
        ).Values()
      );
    });

    it('gets a sample from a group of values', function () {
      SharedTest['Get One Fruit from Group of Fruits'](
        Type.Group.with(FRUITS).Values().with(1).Sample()
      );
    });

    it('gets 3 samples from a group of items', function () {
      SharedTest['Get 3 Fruits from Group of Fruits'](
        Type.Group.with(FRUITS).Values().with(3).Sample()
      );
    });
  });
});
