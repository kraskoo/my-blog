import { Pipe, PipeTransform } from '@angular/core';

import { getMonthAsWord } from '../services/date-service';

@Pipe({ name: 'archiveDate', pure: false })
export class ArchiveDatePipe implements PipeTransform {
  constructor() { }

  public transform(value: any, type: string) {
    value = (value as string).split('-');
    return `${getMonthAsWord(Number(value[0]))} ${value[1]}`;
  }
}
