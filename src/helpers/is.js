/*
 *  Check whether is some object based on some specific constructor
 */

export function isManufacturer(data) {
  return data && data.constructor && data.constructor.name === 'Manufacturer';
}

export function isTypeObject(data) {
  return data && data.__isTypeObject__;
}

export function isNumber(data) {
  return typeof data === 'number';
}

export function isString(data) {
  return typeof data === 'string';
}

export function isBoolean(data) {
  return typeof data === 'boolean';
}

export function isFunction(data) {
  return typeof data === 'function';
}

export function isUndefined(data) {
  return typeof data === 'undefined';
}

export function isArray(data) {
  return data instanceof Array;
}
