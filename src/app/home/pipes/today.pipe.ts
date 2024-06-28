import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'today'
})
export class TodayPipe implements PipeTransform {

  transform(value: Date): string {
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    return new Intl.DateTimeFormat('es-PE', options).format(value)
  }

}
