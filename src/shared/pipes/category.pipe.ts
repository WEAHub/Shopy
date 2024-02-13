import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'categoryPipe',
})
export class CategoryPipe implements PipeTransform {
  transform(word: string): string {
    return (
      'categories.' +
      word.replace(/[\s~`!@#$%^&*(){}[\];:"'<,.>?/\\|_+=-]/g, '')
    );
  }
}
