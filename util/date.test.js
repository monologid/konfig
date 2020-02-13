import DateUtil from './date';
import moment from 'moment';

test('toISOFormatString should return date in ISO format', () => {
  let d = new DateUtil();
  let date = d.toISOFormatString();
  expect(date).not.toBe(moment().format('YYYY-MM-DD'));
})