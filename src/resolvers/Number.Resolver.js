/* TODO: Implement binary, oct & hex type */

if ( ! Math.between) {
  Math.between = (min, max) => Math.random() * (max - min) + min;
}

export default function NumberResolver(options = {
  type: 'integer',
  max: 10000,
  min: NaN,
  positive: true,
  negative: true,
  zero: true,
  decimals: 0,
}) {
  const { type, positive, negative, zero, decimals } = options;
  let { min, max } = options;
  if (positive) {
    if (negative) {
      /* Both positive and negative case */
      min = min || -max;
    } else {
      /* Absolute Positive case */
      min = zero ? 0 : 1;
    }
  } else {
    /* Absolute negative case */
    max = -max;
    min = zero ? 0 : -1;
  }

  let number = NaN;

  do {
    number = Math.between(min, max);
    if (type === 'integer') {
      number = Math.floor(number);
    }
  } while (!zero && number === 0)

  return number;
}