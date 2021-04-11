import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gramos'
})
export class GramosPipe implements PipeTransform {

  transform(value: string): string {
    let result:string
    result = value + " gr"
    return result;
  }

}
