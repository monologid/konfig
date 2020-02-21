import DateUtil from './date';
import moment from 'moment';

test('toISOFormatString should return date in ISO format', () => {
  let currentDate = moment().format('YYYY-MM-DD');
  let d = new DateUtil(currentDate);
  let date = d.toISOFormatString();
  expect(date).not.toBe(currentDate);
})