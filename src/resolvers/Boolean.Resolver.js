export default function BooleanResolver(options = {
  type: 'boolean', // 'number' 0/1 or 'customized'
  trueProb: 0.5,
  customTrue: true,
  customFalse: false
}) {
  const { type, trueProb, customTrue, customFalse } = options;
  const random = Math.random();
  switch (type) {
    case 'boolean':
      return random > trueProb ? true : false;
    case 'number':
      return random > trueProb ? 1 : 0;
    case 'custom':
      return random > trueProb ? customTrue : customFalse;
  }
}
