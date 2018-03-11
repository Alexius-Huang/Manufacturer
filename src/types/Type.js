import { isString, isArray, isUndefined, isFunction } from '../helpers/is';
import assign from '../helpers/assign';

if (!String.prototype.capitalize) {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
}

export default class Type {
  constructor(title, resolver) {
    this.title = title;
    this.resolver = resolver || (this.constuctor || this.constructor.resolver);

    this.__namespaced_store__ = {};

    /* Prepositions */
    this.as = {};
    this.be = {};

    this.__cache__ = null;
    this.__isTypeObject__ = true;

    this.__active_prepositions__ = ['with', 'of', 'assign', 'let'];
    this.__passive_prepositions__ = [this.as, this.be];
    this.__conjunct_prepositions__ = ['and', 'a', 'an', 'to'];

    this
      .BindActivePrepositionMethods()
      .BindPassivePrepositionMethods()
      .BindConjunctPrepositionMethods();
  }

  activate(trait) {
    this.__namespaced_store__[trait] = true;
    return this;
  }

  deactivate(trait) {
    this.__namespaced_store__[trait] = false;
    return this;
  }

  switchMode(trait, value) {
    this.__namespaced_store__[trait] = value;
    return this;
  }

  __getProperties__() { return this.__namespaced_store__; }

  resolve() {
    if (this.resolver) {
      return this.resolver(this.__getProperties__());
    }

    return new Error(`\`${this.constructor.name}\` requires a resolver to generate data, you can provide a function which returns a value and set by class method: \`UseResolver\``);
  }

  static DefineBuiltInTrait(traitName, defaultValue) {
    const capitalizedTraitName = traitName.capitalize();

    /* Define Direct-Trait Method */
    this.prototype[capitalizedTraitName] = function(traitInputValue) {
      if (!isUndefined(traitInputValue)) {
        this.__namespaced_store__[traitName] = traitInputValue;
      } else if (!isUndefined(this.__cache__)) {
        this.__namespaced_store__[traitName] = this.__cache__;
      } else {
        this.__namespaced_store__[traitName] = defaultValue;
      }
      this.__cache__ = undefined;
      return this;
    };

    /* Define With-Trait Method */
    this.prototype[`with${capitalizedTraitName}`] = function (traitInputValue) {
      return this[capitalizedTraitName](traitInputValue);
    };

    return this;
  }

  static UseResolver(resolver) {
    this.resolver = resolver;
    return this;
  }

  static ExtendAsProperty(title, getter) {
    Object.defineProperty(this, title, { get: getter });
    return this;
  }

  static ExtendAsProperties(object) {
    Object.defineProperties(
      this,
      Object.keys(object).reduce(
        (result, title) => ({
          ...result,
          [title]: { get: () => new object[title]() }
        }),
        {}
      )
    );
    return this;
  }

  static ExtendAsClassMethods(object) {
    Object.keys(object).forEach(title => {
      const callback = object[title];
      this[title] = callback;
    });
    return this;
  }

  attributes(arrayOfProps, override = {}) {
    for (let i = 0; i < arrayOfProps.length; i++) {
      const { name, type, default: defaultValue } = arrayOfProps[i];
      this.__namespaced_store__[name] = assign(type, defaultValue, override[name]);
    }
  }

  BindActivePrepositionMethods() {
    this.__active_prepositions__.forEach(preposition => {
      this[preposition] = data => {
        this.__cache__ = data;
        return this;
      };
    });

    return this;
  }

  BindPassivePrepositionMethods() {
    /* WIP... */
    return this;
  }

  BindConjunctPrepositionMethods() {
    Object.defineProperties(
      this,
      this.__conjunct_prepositions__.reduce(
        (object, preposition) => ({
          ...object,
          [preposition]: { get: () => this }
        }),
        {}
      )
    );

    return this;
  }

  BindAsProperty(title, getterFunction) {
    const getterObject = { get: getterFunction };
    Object.defineProperty(this, title, getterObject);
    this.__passive_prepositions__.forEach(preposition => {
      Object.defineProperty(preposition, title, getterObject);
    });
  }

  BindAsProperties(propertyObject) {
    const properties = Object.keys(propertyObject);
    const transformedPropertyObject = {};

    properties.forEach(property => {
      const propertyGetterFunction = propertyObject[property];
      if (!isFunction(propertyGetterFunction)) {
        throw new Error(`Should defined as getter function, instead got: ${typeof propertyGetterFunction}`);
      }
      transformedPropertyObject[property] = { get: propertyGetterFunction };
    });

    Object.defineProperties(this, transformedPropertyObject);
    this.__passive_prepositions__.forEach(prepositions => {
      Object.defineProperties(prepositions, transformedPropertyObject);
    });
  }

  BindTraitsWithPrepositions(traitInput) {
    if (isString(traitInput)) {
      this.__passive_prepositions__.forEach(preposition => {
        Object.defineProperty(preposition, traitInput, {
          get: () => this[traitInput](this.__cache__)
        });
      });
    } else if (isArray(traitInput)) {
      const definePropertiesObject = traitInput.reduce(
        (traitsObject, trait) => ({
          ...traitsObject,
          [trait]: { get: () => this[trait](this.cache) }
        }),
        {}
      );

      this.__passive_prepositions__.forEach(preposition => {
        Object.defineProperties(preposition, definePropertiesObject);
      });
    }

    return this;
  }
}
