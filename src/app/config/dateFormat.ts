import * as moment from 'moment';

export function format(date: string) {
    let _d = moment(new Date(date));
    return _d.format('YYYY-MM-DD');
}