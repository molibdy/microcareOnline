import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grams'
})
export class GramsPipe implements PipeTransform {

  transform(value: number ): string {
    let gramos:string
    if(value>0){
      gramos= `(${value}gr)`
    }else{
      gramos=''
    }
    return gramos;
  }

}
