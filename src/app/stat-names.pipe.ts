import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statNames',
})
export class StatNamesPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'k':
        return 'K';
      case 'bb':
        return 'BB';
      case 'go':
        return 'GO';
      case 'fb':
        return '1B';
      case 'sb':
        return '2B';
      case 'fo':
        return 'FO';
      case 'hr':
        return 'HR';
      case 'tb':
        return '3B';
      default:
        return '';
    }
    return null;
  }
}
