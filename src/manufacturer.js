import { isManufacturer } from './helpers/is';
import traverseObjectPairs from './helpers/traverseObjectPairs';
import Type from './type';

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
    traverseObjectPairs(this.blueprint, (attr, dataType) => {
      if (isManufacturer(dataType)) {
        object[attr] = dataType.create();
      } else if (dataType instanceof Function) {
        object[attr] = (dataType.bind(this))();
      } else {
        object[attr] = dataType;
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
}

Manufacturer.Type = Type;

export default Manufacturer;
