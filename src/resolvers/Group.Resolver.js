import { isTypeObject, isArray } from '../helpers/is';

export default function GroupResolver(options = {
  values: [],
  shuffle: false,
  sample: NaN
}) {
  const { values, shuffle, sample } = options;
  let result;

  if (isArray(values)) {
    result = [...values];
  } else if (isTypeObject(values) && values.constructor.name === 'ArrayType') {
    result = values.resolve();
  } else {
    throw new Error(`Values in GroupType accepts Array or ArrayType object. Got: ${typeof values}`);
  }

  if (shuffle) {
    /* Use Fisher-Yates Shuffle Algorithm */
    let j, memory;
    for (let i = result.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      memory = result[i];
      result[i] = result[j];
      result[j] = memory;
    }
  }

  if (sample) {
    if (sample > result.length) {
      throw new Error(`Sample size: ${sample} is too large. Should limited in max size: ${result.length}.`);
    }

    let random = NaN;
    let oldResult = [...result];
    result = [];
    for (let i = 0; i < sample; i++) {
      random = Math.floor(Math.random() * oldResult.length);
      result.push(...oldResult.splice(random, 1));
    }

    result = result.length === 1 ? result[0] : result;
  }

  return result;
}
