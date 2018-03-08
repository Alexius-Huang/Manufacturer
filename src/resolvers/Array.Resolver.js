import { isTypeObject, isFunction } from '../helpers/is';

export default function ArrayResolver(options = {
  length: 5,
  element: undefined
}) {
  const { length, element } = options;
  const result = Array.from(Array(length));

  if (isTypeObject(element)) {
    return result.map(() => element.resolve());
  } else if (isFunction(element)) {
    return result.map(element);
  }
  return result.map(() => element);
}