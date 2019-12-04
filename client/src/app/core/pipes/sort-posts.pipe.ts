import { Pipe, PipeTransform } from '@angular/core';
import { ExtendedPost } from '../models/post.model';

@Pipe({ name: 'sortPosts', pure: false })
export class SortPostsPipe implements PipeTransform {
  // format: posts | sortPosts: 'author._id,creationDate|desc,_id,title.length|asc,content'
  public transform(value: any, type: string) {
    return (value as ExtendedPost[]).sort((a, b) => {
      const aValues = this.getInnerProperty(a, type);
      const bValues = this.getInnerProperty(b, type);
      for (let i = 0; i < aValues.length; i++) {
        const order = aValues[i].order;
        const diff = order === 'asc' ?
          aValues[i].value.localeCompare(bValues[i].value) :
          bValues[i].value.localeCompare(aValues[i].value);
        if (diff !== 0) {
          return diff;
        }
      }

      return 0;
    });
  }

  private getInnerProperty(obj: object, properties: string): { value: string, order: string }[] {
    const propsAndOrder = properties.split(',');
    const values: { value: string, order: string }[] = [];
    let someValue = null;
    for (let propAndOrder of propsAndOrder) {
      const pao = propAndOrder.split('|');
      const prop = pao[0];
      const order = pao.length > 1 ? pao[1] : 'asc';
      if (order !== 'asc' && order !== 'desc') {
        throw new Error('Order should be either asc or desc!');
      }

      const innerProperties = prop.split('.');
      for (const property of innerProperties) {
        if (someValue === null) {
          someValue = obj[property];
        } else {
          someValue = someValue[property];
        }
      }

      values.push({ value: `${someValue}`, order });
      someValue = null;
    }

    return values;
  }
}
