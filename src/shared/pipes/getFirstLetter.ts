import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  standalone: true,
  name: 'getFirstLetter'
})
export class GetFirstLetter implements PipeTransform {
  transform(word: string): string {
    return word.substring(0, 1);
  }
}