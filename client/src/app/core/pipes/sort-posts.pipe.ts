import { Pipe, PipeTransform } from '@angular/core';
import { ExtendedPost } from '../models/post.model';

@Pipe({ name: 'sortPosts', pure: false })
export class SortPostsPipe implements PipeTransform {
  public transform(value: any, type: string) {
    return (value as ExtendedPost[]).sort((a, b) =>
      (this.getInnerProperty(a, type) as string).localeCompare(this.getInnerProperty(b, type) as string));
  }

  private getInnerProperty(obj: object, properties: string) {
    let someValue = null;
    const innerProperties = properties.split('.');
    for (const property of innerProperties) {
      if (someValue === null) {
        someValue = obj[property];
      } else {
        someValue = someValue[property];
      }
    }

    return someValue;
  }
}
