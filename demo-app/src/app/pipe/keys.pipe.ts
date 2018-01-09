import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args: string[]): any {
    let keys = [];
    if (typeof value === 'object') {
      for (let key in value) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }

}
