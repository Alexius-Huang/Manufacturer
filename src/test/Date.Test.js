import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

/* TODO: Write test for time formatting... */
console.log(Manufacturer.define({
  date: Type.Date.Format('YYYY-MM-DD ddd AA hh:mm:ss z')
}).create())
