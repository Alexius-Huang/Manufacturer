import { isNumber } from '../helpers/is';

export default function DateResolver(options = {
  startTime: null,
  endTime: null,
  timeDelta: null,
  locale: 'en-US',
  format: null,
  type: 'CURRENT' // 'CURRENT', 'RANGED'
}) {
  const {
    startTime,
    endTime,
    timeDelta,
    locale,
    type
  } = options;

  let { format } = options;

  let result = new Date().getTime();

  if (type === 'CURRENT') {
    if (!isNaN(timeDelta)) {
      result += timeDelta;
    }
  } else if (type === 'RANGED') {
    /* TODO: Implement random timing generated in ranged time */
  } else {
    throw new Error(`\`type\` of the DateType can only be either \`CURRENT\` or \`RANGED\``);
  }

  if (format) {
    const date = new Date(result);

    /* Full Year, e.g. 2018 */
    const YYYY = String(date.getFullYear());

    /* Month in Year, e.g. 1 ~ 12 */
    const MM = String(date.getMonth() + 1).padStart(2, '0');

    /* Day in Month, e.g. 1 ~ (28 ~ 31) */
    const DD = String(date.getDate()).padStart(2, '0');

    /* Day in Week */
    const d = String(date.getDay());
    let dd, ddd;

    switch (d){
      case '1': dd = 'Mon.'; ddd = 'Monday';    break;
      case '2': dd = 'Tue.'; ddd = 'Tuesday';   break;
      case '3': dd = 'Wed.'; ddd = 'Wednesday'; break;
      case '4': dd = 'Thu.'; ddd = 'Thursday';  break;
      case '5': dd = 'Fri.'; ddd = 'Friday';    break;
      case '6': dd = 'Sat.'; ddd = 'Saturday';  break;
      case '7': dd = 'Sun.'; ddd = 'Sunday';    break;
    }

    /* Hour in 24hr/12hr format */
    const hours = date.getHours();
    const HH = String(hours).padStart(2, '0');
    const hh = String(hours % 12).padStart(2, '0');

    /* Meridiem AM / PM */
    const isAM = hours < 12;
    const a = isAM ? 'a.m.' : 'p.m.';
    const A = isAM ? 'A.M.' : 'A.M.';
    const aa = isAM ? 'am' : 'pm';
    const AA = isAM ? 'AM' : 'PM'; 

    /* Minutes in an Hour */
    const mm = String(date.getMinutes()).padStart(2, '0');

    /* Seconds in a Minute */
    const ss = String(date.getSeconds()).padStart(2, '0');

    /* Timezone Offset, e.g. +08:00, +0800 */
    const timezone = date.getTimezoneOffset() / 60;
    const z = `${timezone > 0 ? '+' : '-'}${String(Math.abs(timezone)).padStart(2, '0')}:00`;
    const zz = z.replace(/:/, '');

    /* Start Formatting... */
    let newFormat;

    const formatMapping = [
      ['YYYY', YYYY],
      ['MM', MM],
      ['DD', DD],
      ['ddd', ddd],
      ['dd', dd],
      ['HH', HH],
      ['hh', hh],
      ['AA', AA],
      ['aa', aa],
      ['A', A],
      ['a', a],
      ['mm', mm],
      ['ss', ss],
      ['zz', zz],
      ['z', z]
    ];

    /* Formatting Algorithm Start */

    format = [{ parsed: false, content: format }];

    for (let i = 0; i < formatMapping.length; i++) {
      const [splitFormat, value] = formatMapping[i];
      
      let newFormat = [];
      for (let j = 0; j < format.length; j++) {
        const token = format[j];
        if (token.parsed) {
          newFormat.push(token);
          continue;
        }

        let parsedResult = token.content.split(splitFormat);
        let valueAtStart = parsedResult[0] === '';
        let valueAtEnd = parsedResult[parsedResult.length - 1] === '';

        parsedResult = parsedResult
          .filter(subString => subString !== '')
          .reduce((acc, cur) => {
            acc.push({ parsed: false, content: cur });
            acc.push({ parsed: true, content: value });
            return acc;
          }, []);

        parsedResult.pop();

        if (valueAtStart) parsedResult.unshift({ parsed: true, content: value });
        if (valueAtEnd) parsedResult.push({ parsed: true, content: value });
        newFormat = newFormat.concat(parsedResult);
      }

      format = newFormat;
    }

    return format.reduce((acc, token) => acc + token.content, '');
  } else if (locale) {
    return new Date(result).toLocaleDateString(locale);
  }
}
