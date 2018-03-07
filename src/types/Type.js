import { isString, isArray, isUndefined } from '../helpers/is';

if (!String.prototype.capitalize) {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
}

export default class Type {
  constructor(title, resolver) {
    this.title = title;
    this.resolver = resolver;

    /* Prepositions */
    this.As = {};
    this.Be = {};

    this.__cache__ = null;
    this.__isTypeObject__ = true;

    this.__active_prepositions__ = ['With', 'Of', 'Assign', 'Use', 'Let', 'Generate', 'Produce'];
    this.__passive_prepositions__ = [this.As, this.Be];
    this.__conjunct_prepositions__ = ['And', 'A', 'An', 'To'];

    this.BindActivePrepositionMethods();
    this.BindPassivePrepositionMethods();
    this.BindConjunctPrepositionMethods();
  }

  activate(trait) {
    this[trait] = true;
    this.resetResolver();
    return this;
  }

  deactivate(trait) {
    this[trait] = false;
    this.resetResolver();
    return this;
  }

  switchMode(trait, value) {
    this[trait] = value;
    this.resetResolver();
    return this;
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
      this.resetResolver();
      return this;
    };

    /* Define With-Trait Method */
    this.prototype[`With${capitalizedTraitName}`] = function(traitInputValue) {
      return this[capitalizedTraitName](traitInputValue);
    };
  }

  static UseResolver(resolver) {
    this.prototype.resetResolver = function() {
      this.resolver = () => resolver(this);
    };
  }

  static ExtendAsProperty(title, TypeClass) {
    Object.defineProperty(this, title, { get: () => new TypeClass() });
  }

  static ExtendAsProperties(object) {
    Object.defineProperties(
      this,
      Object.keys(object).reduce((result, title) => {
        result[title] = { get: () => new object[title]() };
        return result;
      }, {})
    )
  }

  BindActivePrepositionMethods() {
    this.__active_prepositions__.forEach(preposition => {
      this[preposition] = data => {
        this.__cache__ = data;
        return this;
      };
    });
  }

  BindPassivePrepositionMethods() {
    /* WIP... */
  }

  BindConjunctPrepositionMethods() {
    Object.defineProperties(
      this,
      this.__conjunct_prepositions__.reduce((object, preposition) => {
        object[preposition] = { get: () => this };
        return object;
      }, {})
    );
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
  }
}
