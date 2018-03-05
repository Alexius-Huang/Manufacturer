export default function BooleanResolver(options = {
  type: 'BOOLEAN_LOGIC', // 'DIGITAL_LOGIC' 0/1 or 'CUSTOM_LOGIC'
  probability: 0.5,
  truthy: true,
  falsy: false,
  reversed: false
}) {
  const { type, probability, truthy, falsy, reversed } = options;
  const random = Math.random();
  switch (type) {
    case 'BOOLEAN_LOGIC':
      return random < probability && !reversed ? true : false;
    case 'DIGITAL_LOGIC':
      return random < probability && !reversed ? 1 : 0;
    case 'CUSTOM_LOGIC':
      return random < probability && !reversed ? truthy : falsy;
    default:
      /* TODO: Throw error... */
      return false;
  }
}
