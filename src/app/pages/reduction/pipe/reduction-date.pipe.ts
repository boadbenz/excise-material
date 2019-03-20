import { Pipe, PipeTransform } from '@angular/core';
import moment = require('moment');
import 'moment/locale/th';

@Pipe({name: 'reductionDatePipe'})
export class ReductionDatePipe implements PipeTransform {
  transform(date: string, format: string) {
    return moment(date.replace(' +00:00', '')).add(543, 'years').format(format);
  }
}
