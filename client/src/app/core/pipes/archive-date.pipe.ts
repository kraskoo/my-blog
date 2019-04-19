import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'archiveDate', pure: false })
export class ArchiveDatePipe implements PipeTransform {
  constructor() { }

  public transform(value: any, type: string) {
    value = (value as string).split('-');
    return `${this.getMonthAsWord(Number(value[0]))} ${value[1]}`;
  }

  private getMonthAsWord(date: number) {
    switch (date) {
      case 0: return 'January';
      case 1: return 'February';
      case 2: return 'March';
      case 3: return 'April';
      case 4: return 'May';
      case 5: return 'June';
      case 6: return 'July';
      case 7: return 'August';
      case 8: return 'September';
      case 9: return 'Octomber';
      case 10: return 'November';
      case 11: return 'December';
    }
  }
}
