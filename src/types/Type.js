if (!String.prototype.capitalize) {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
}

export default class Type {
  constructor(title, resolver) {
    this.title = title;
    this.resolver = resolver;
    this.__isTypeObject__ = true;

    this.cache = null;
    this.As = {};

    Object.defineProperties(this, {
      And: { get: () => this }
    });
  }

  With(data) {
    this.cache = data;
    return this;
  }

  Of(data) {
    this.cache = data;
    return this;
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
      this[traitName] = traitInputValue || this.cache || defaultValue;
      this.cache = null;
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
}
