/*
 *  Check whether is some object based on some specific constructor
 */

export function isManufacturer(data) {
  return data && data.constructor && data.constructor.name === 'Manufacturer';
}
