import { OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aedToDollar'
})
export class AedToDollarPipe implements PipeTransform {

  constructor() { }

  transform(value: string, conversionRate = 0) {
    let price = value;

    return conversionRate ? `${value} ($${(conversionRate * parseFloat(price)).toFixed(2)})` : " ";
  }
}
