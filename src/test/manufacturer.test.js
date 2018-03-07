import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

describe('Manufacturer', () => {
  describe('#extend', () => {
    beforeEach(function() {
      this.Person = Manufacturer.define({
        name: Type.String,
        age: Type.Number.Positive.Integer.Between(18, 100)
      });
    });

    it('extends the factory and create object according to the extended blueprint', function() {
      const Engineer = Manufacturer.define({ occupation: 'Engineer' });
      const engineer = this.Person.extend(Engineer).create();

      engineer.should.have.property('name');
      engineer.name.should.be.a.String();
      engineer.should.have.property('age');
      engineer.age.should.be.a.Number().and.within(18, 100);
      engineer.should.have.property('occupation', 'Engineer');
    });

    it('extends the factory and create object which can be overwritten by extended property', function() {
      const Student = Manufacturer.define({
        occupation: 'Student',
        age: Type.Number.Positive.Integer.Within(9, 21)
      });
      const student = this.Person.extend(Student).create();

      student.should.have.property('name');
      student.name.should.be.a.String();
      student.should.have.property('age');
      student.age.should.be.a.Number().and.within(9, 21);
      student.should.have.property('occupation', 'Student');      
    });
  })
});
