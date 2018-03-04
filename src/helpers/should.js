/*
 *  Check whether the data should be some type
 *  Will raise error if not satisfied
 */

export default function Should(data) {
  this.Be = (...traits) => {
    for (let i = 0; i < traits.length; i++) {
      const trait = traits[i];
      if ( ! this.Be[trait]) {
        throw new Error(`Should be ${trait}. Got: ${data}`);
      }
    }
    return true;
  };

  this.Be.Number = typeof data === 'number';
  this.Be.Integer = this.Be.Number && data % 1 === 0;
  this.Be.Float = !this.Be.Integer;
  this.Be.Positive = this.Be.Number && data > 0;
  this.Be.Negative = this.Be.Number && data < 0;
  this.Be.Zero = this.Be.Number && data === 0;

  this.Be.String = typeof data === 'string';
  this.Be.Boolean = typeof data === 'boolean';
  this.Be.Function = typeof data === 'function';
}
