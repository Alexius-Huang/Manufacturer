import '../helpers/string.polyfill';
import Manufacturer from '../manufacturer';
import should from 'should';

const { Type } = Manufacturer;

describe('DateType', () => {
  it('constructs new DateType object with Type.Date', () => {
    const dateType = Type.Date;
    dateType.should.have.property('title', 'Date');
    dateType.should.have.property('resolver');
    dateType.should.have.property('type');
    dateType.should.have.property('format');
    dateType.constructor.name.should.be.exactly('DateType');
    dateType.should.not.be.exactly(Type.Date);

    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = date.getMonth() + 1;
    const DD = date.getDate();
    dateType.resolve().should.be.a.String().and.be.exactly(`${MM}/${DD}/${YYYY}`);
  });

  describe('DateTime Formatting', () => {
    beforeEach(function() {
      this.date = new Date();
    });

    it('formats full year by `YYYY` / month in year by `MM` / day in month by `DD` formatter ', function() {
      const YYYY = this.date.getFullYear();
      const MM = String(this.date.getMonth() + 1).padStart(2, '0');
      const DD = String(this.date.getDate()).padStart(2, '0');

      Type.Date.Format('YYYY-MM-DD').resolve()
        .should.be.a.String().and.be.exactly(`${YYYY}-${MM}-${DD}`);
    });

    it('format day in week with formatter `ddd` first, then `dd`, but no of type `d` formatter', function() {
      const d = String(this.date.getDay());
      let dd, ddd;
      switch (d) {
        case '1': dd = 'Mon.'; ddd = 'Monday'; break;
        case '2': dd = 'Tue.'; ddd = 'Tuesday'; break;
        case '3': dd = 'Wed.'; ddd = 'Wednesday'; break;
        case '4': dd = 'Thu.'; ddd = 'Thursday'; break;
        case '5': dd = 'Fri.'; ddd = 'Friday'; break;
        case '6': dd = 'Sat.'; ddd = 'Saturday'; break;
        case '7': dd = 'Sun.'; ddd = 'Sunday'; break;
      }

      Type.Date.Format('d ddd%dd d-dddd  dd |d| $ddddd d--ddd-dd').resolve()
        .should.be.a.String().and.be.exactly(`d ${ddd}%${dd} d-${ddd}d  ${dd} |d| \$${ddd}${dd} d--${ddd}-${dd}`);
    });

    it('formats 24hr format in `HH` / 12hr format in `hh`', function() {
      const hours = this.date.getHours();
      const HH = String(hours).padStart(2, '0');
      const hh = String(hours % 12).padStart(2, '0');

      Type.Date.Format('HH hh h HH hH H hh HHHhHHhhh').resolve()
        .should.be.a.String().and.be.exactly(`${HH} ${hh} h ${HH} hH H ${hh} ${HH}Hh${HH}${hh}h`);
    });

    it('formats meridiem with formatter `AA` first, then `aa`, then `A` and lastly with `a`', function() {
      const hours = this.date.getHours();
      const isAM = hours < 12;
      const a = isAM ? 'a.m.' : 'p.m.';
      const A = isAM ? 'A.M.' : 'P.M.';
      const aa = isAM ? 'am' : 'pm';
      const AA = isAM ? 'AM' : 'PM';

      Type.Date.Format('aaAaa aAAaaA %AA AaaAaaaaAAaaa').resolve()
        .should.be.a.String().and.be.exactly(`${aa}${A}${aa} ${a}${AA}${aa}${A} %${AA} ${A}${aa}${A}${aa}${aa}${AA}${aa}${a}`);
    });

    it('formats minutes using `mm` / seconds using `ss` formatter', function() {
      const mm = String(this.date.getMinutes()).padStart(2, '0');
      const ss = String(this.date.getSeconds()).padStart(2, '0');

      Type.Date.Format('mm ss m sssmm sm smmsmsssm smmmsssssmms').resolve()
        .should.be.a.String().and.be.exactly(`${mm} ${ss} m ${ss}s${mm} sm s${mm}sm${ss}sm s${mm}m${ss}${ss}s${mm}s`)
    });

    it('formats timezone which parses `zz` first, then `z`', function() {
      const timezone = this.date.getTimezoneOffset() / 60;
      const z = `${timezone > 0 ? '+' : '-'}${String(Math.abs(timezone)).padStart(2, '0')}:00`;
      const zz = z.replace(/:/, '');

      Type.Date.Format('zzz z zz  zzzzz zz z  zz  z z   zzzz').resolve()
        .should.be.a.String().and.be.exactly(`${zz}${z} ${z} ${zz}  ${zz}${zz}${z} ${zz} ${z}  ${zz}  ${z} ${z}   ${zz}${zz}`);
    });

    it('formats in any kind of combination', function() {
      const YYYY = this.date.getFullYear();
      const MM = String(this.date.getMonth() + 1).padStart(2, '0');
      const DD = String(this.date.getDate()).padStart(2, '0');
      const HH = String(this.date.getHours()).padStart(2, '0');
      const mm = String(this.date.getMinutes()).padStart(2, '0');
      const ss = String(this.date.getSeconds()).padStart(2, '0');
      const AA = this.date.getHours() < 12 ? 'AM' : 'PM';

      Type.Date.Format('YYYY-MM-DD AA HH:mm:ss').resolve()
        .should.be.a.String().and.be.exactly(`${YYYY}-${MM}-${DD} ${AA} ${HH}:${mm}:${ss}`);
    });
  });
});
