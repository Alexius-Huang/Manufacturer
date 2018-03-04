export default class Type {
  constructor(title, resolver) {
    this.title = title;
    this.resolver = resolver;
    this.__isTypeObject__ = true;

    this.cache = null;
  }

  With(data) {
    this.cache = data;
    return this;
  }

  Of(data) {
    this.cache = data;
    return this;
  }
}
