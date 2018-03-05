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
}
