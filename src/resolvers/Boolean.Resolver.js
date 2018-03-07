export default function BooleanResolver(options = {
  type: 'BOOLEAN_LOGIC', // 'DIGITAL_LOGIC' 0/1 or 'CUSTOM_LOGIC'
  probability: 0.5,
  truthy: true,
  falsy: false,
  reversed: false
}) {
  const { type, probability, truthy, falsy, reversed } = options;
  const random = Math.random();
  const returnTrue = random < (reversed ? 1 - probability : probability);
  switch (type) {
    case 'BOOLEAN_LOGIC':
      return returnTrue ? true : false;
    case 'DIGITAL_LOGIC':
      return returnTrue ? 1 : 0;
    case 'CUSTOM_LOGIC':
      return returnTrue ? truthy : falsy;
    default:
      /* TODO: Throw error... */
      return false;
  }
}
