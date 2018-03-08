import { isString, isArray, isUndefined } from '../helpers/is';

if (!String.prototype.capitalize) {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
}

export default class Type {
  constructor(title, resolver) {
    this.title = title;
    this.resolver = resolver || (this.constuctor || this.constructor.resolver);

    /* Prepositions */
    this.As = {};
    this.Be = {};

    this.__cache__ = null;
    this.__isTypeObject__ = true;

    this.__active_prepositions__ = ['With', 'Of', 'Assign', 'Use', 'Let', 'Generate', 'Produce'];
    this.__passive_prepositions__ = [this.As, this.Be];
    this.__conjunct_prepositions__ = ['And', 'A', 'An', 'To'];

    this
      .BindActivePrepositionMethods()
      .BindPassivePrepositionMethods()
      .BindConjunctPrepositionMethods();
  }

  activate(trait) {
    this[trait] = true;
    return this;
  }

  deactivate(trait) {
    this[trait] = false;
    return this;
  }

  switchMode(trait, value) {
    this[trait] = value;
    return this;
  }

  resolve() {
    if (this.resolver) {
      return this.resolver(this);
    }

    return new Error(`\`${this.constructor.name}\` requires a resolver to generate data, you can provide a function which returns a value and set by class method: \`UseResolver\``);
  }

  static DefineBuiltInTrait(traitName, defaultValue) {
    const capitalizedTraitName = traitName.capitalize();

    /* Define Direct-Trait Method */
    this.prototype[capitalizedTraitName] = function(traitInputValue) {
      if (!isUndefined(traitInputValue)) {
        this[traitName] = traitInputValue;
      } else if (!isUndefined(this.__cache__)) {
        this[traitName] = this.__cache__;
      } else {
        this[traitName] = defaultValue;
      }
      this.__cache__ = undefined;
      return this;
    };

    /* Define With-Trait Method */
    this.prototype[`With${capitalizedTraitName}`] = function(traitInputValue) {
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
      Object.keys(object).reduce((result, title) => {
        result[title] = { get: () => new object[title]() };
        return result;
      }, {})
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
      this.__conjunct_prepositions__.reduce((object, preposition) => {
        object[preposition] = { get: () => this };
        return object;
      }, {})
    );

    return this;
  }

  BindTraitsWithPrepositions(traitInput) {
    if (isString(traitInput)) {
      this.__passive_prepositions__.forEach(preposition => {
        Object.defineProperty(preposition, traitInput, {
          get: () => this[traitInput](this.__cache__)
        });
      });
    } else if (isArray(traitInput)) {
      const definePropertiesObject = {};
      for (let i = 0; i < traitInput.length; i++) {
        const trait = traitInput[i];
        definePropertiesObject[trait] = { get: () => this[trait](this.cacche) };
      }

      this.__passive_prepositions__.forEach(preposition => {
        Object.defineProperties(preposition, definePropertiesObject);
      });
    }

    return this;
  }
}
