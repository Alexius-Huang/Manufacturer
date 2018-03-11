import { isManufacturer, isTypeObject, isFunction } from './helpers/is';
import traverseObjectPairs from './helpers/traverseObjectPairs';
import Type from './types/Type.Extend';

class Manufacturer {
  constructor(blueprint) {
    this.blueprint = blueprint;
    this.traits = new Map();
    this.attributes = new Set(Object.keys(blueprint));
    this.idCounter = 0;
    this.$before = function $before() { };
    this.$after = function $after(obj) { return obj; };

    /* Built-in Traits Defined Here */
    this.registerDefaultTraits();
  }

  trait(key, method) {
    this.traits.set(key, method);
    return this;
  }

  registerDefaultTraits() {
    this.traits.set('Default', obj => obj);
    this.traits.set('Blueprint', obj => obj);
  }

  before(fn) {
    this.$before = fn;
    return this;
  }

  after(fn) {
    this.$after = fn;
    return this;
  }

  resetIDCounter() {
    this.idCounter = 0;
    return this;
  }

  extend(factory) {
    if (isManufacturer(factory)) {
      this.blueprint = { ...this.blueprint, ...factory.blueprint };
      return this;
    }
    throw new Error(`Should extend Manufacturer with another Manufacturer Object. Got: ${factory}`);
  }

  create(...args) {
    this.idCounter += 1;

    /* Parameter Assignment */
    let traits = [];
    let fixedAttributes = {};
    if (args[args.length - 1] instanceof Object) {
      fixedAttributes = args[args.length - 1];
      args.pop();
      traits = args;
    } else {
      traits = args;
    }

    /* Before creating object */
    this.$before();

    let object = {};

    /* Traverse each attribute and create data according to blueprint */
    traverseObjectPairs(this.blueprint, (attr, obj) => {
      if (isTypeObject(obj)) {
        object[attr] = obj.resolve();
      } else if (isFunction(obj)) {
        object[attr] = obj();
      } else {
        object[attr] = obj;
      }
    });

    /* Assign fixed attribute to the newly created object */
    traverseObjectPairs(fixedAttributes, (attr, value) => {
      if (this.attributes.has(attr)) {
        object = { ...object, [attr]: value };
      }
    });

    /* Traverse each trait to manipulate data construction */
    for (let j = 0; j < traits.length; j += 1) {
      const traitMethod = this.traits.get(traits[j]);
      object = traitMethod(object);
    }

    /* After object created */
    object = this.$after(object);

    return object;
  }

  /* Special DataType Manufacturer Constructor */
  static define(blueprint) {
    return new Manufacturer(blueprint);
  }

  static attributesFor(typeObject) {
    if (!isTypeObject(typeObject)) {
      throw new Error(`Manufacturer.attributesFor should receive \`Type\` object. Instead got: ${typeof typeObject}`);
    }

    if (!isFunction(typeObject.__getProperties__)) {
      throw new Error(`Manufacturer cannot get property from \`Type\` object, suppose to have Type#__getProperties function.`);
    }

    return typeObject.__getProperties__();
  }
}

Manufacturer.Type = Type;

export default Manufacturer;
