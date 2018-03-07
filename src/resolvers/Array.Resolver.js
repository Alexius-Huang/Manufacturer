import { isTypeObject } from '../helpers/is';

export default function ArrayResolver(options = {
  length: 5,
  element: undefined
}) {
  const { length, element } = options;
  if (isTypeObject(element)) {
    return Array.from(Array(length)).map(() => element.resolver());
  } else {
    return Array.from(Array(length)).map(() => element);
  }
}