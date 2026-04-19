import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paragraphs',
  standalone: true
})
export class ParagraphsPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';
    return value
      .split('\n')
      .map(p => `<p>${p}</p>`)
      .join('');
  }
}
