import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specialDate'
})
export class SpecialDatePipe implements PipeTransform {

  transform(value: string, daysOffset: number): Date {
    let date = new Date(+value);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    if(daysOffset !== undefined) {
      date = this.addDays(date, daysOffset);
    }
    return date;
  }

  addDays(date, days): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

}
