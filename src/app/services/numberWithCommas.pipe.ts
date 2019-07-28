import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({ name: 'numComma' })
export class NumberWithCommasPipe implements PipeTransform {

  transform(input: any): string {
  	let tmpInputStr = input.toString().replace(/\,/g, '').replace(/\$/g,'');
    return '$' + tmpInputStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

@Pipe({ name: 'numCommaNoCurrency' })
export class NumberWithCommasNoCurrencyPipe implements PipeTransform {

  transform(input: any): string {
    if(typeof input==='number' || (input && typeof input==='string')){
      let tmpInputStr = input.toString().replace(/\,/g, '').replace(/\$/g,'');
      return tmpInputStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return '';
  }
}

@Pipe({ name: 'asicPercent' })
export class AsicPercentagePipe extends DecimalPipe {

  transform(input: any): string {
    if(input){
      let tmpInputStr = input.toString().replace(/\,/g, '').replace(/\%/g,'');
      return super.transform(
                tmpInputStr.replace(/\B(?=(\d{3})+(?!\d))/g, ","), "1.2-2"
             ) + '%';
    }
    return '';
  }
}

@Pipe({
  name: 'thousandSuff'
})
export class ThousandSuffixesPipe implements PipeTransform {

  transform(input: any, args?: any): any {
    var exp, rounded,
      suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

    if (Number.isNaN(input)) {
      return '$'+input;
    }

    if (input < 1000) {
      return input;
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    return '$'+(input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];


  }

}
