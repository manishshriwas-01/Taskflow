import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueSoon',
  standalone: true
})
export class DueSoonPipe implements PipeTransform {

  transform(value: string): string {

    const today = new Date();

    const dueDate = new Date(value);

    const diffTime = dueDate.getTime() - today.getTime();

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {

      return 'Overdue';

    }

    if (diffDays === 0) {

      return 'Due Today';

    }

    if (diffDays === 1) {

      return 'Tomorrow';

    }

    return `in ${diffDays} Days`;

  }

}