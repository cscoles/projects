import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {

  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    };
    return keys;
	}

}

@Pipe({
  name: 'phone'
})
export class PhonePipe {
  transform(val) {
    var viewVal = val.trim().replace(/^\+/, '');
    viewVal = viewVal.replace(/[^0-9]/g, '').slice(0,10);
    var area, number;

    switch(viewVal.length) {
      case 1:
      case 2:
      case 3:
        area = viewVal;
        break;

      default:
        area = viewVal.slice(0,3);
        number = viewVal.slice(3);
    }

    if (number) {
      if (number.length > 3) {
        number = number.slice(0,3) + '-' + number.slice(3,7);
      }
      else {
        number = number;
      }
      return ("(" + area + ") " + number).trim().slice(0,14);
    }
    else {
      return "(" + area;
    }
  }
}
