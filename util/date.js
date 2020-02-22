import moment from 'moment';

export default class DateUtil {
  constructor(date) {
    this.date = (date) ? moment(date) : moment();
  }

  toISOFormatString() {
    return this.date.format('YYYY-MM-DDTHH:mm:ss');
  }
}