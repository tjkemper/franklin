import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dot'
})
export class DotPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if(value <= 0) {
      return "";
    }
    let dots: string = "";
    for(let i = 0; i < value; i++) {
      dots += " •";
    }
    return dots;
  }

}
