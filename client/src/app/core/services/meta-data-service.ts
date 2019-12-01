import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

interface Custometatag {
  [key: string]: string;
}

interface Custometatags {
  tag?: Custometatag;
}

interface Metatag {
  name: string;
  content: string | number | Date;
  isEmpty: boolean;
}

interface Metadata {
  [key: string]: Metatag[] | Metatag | Custometatag[] | Custometatag | string[] | string | number | Date
}

const defaultMetadata: Metadata = {
  title: 'My Blog',
  description: { name: 'description', content: '', isEmpty: true },
  keywords: { name: 'keywords', content: '', isEmpty: true },
  author: { name: 'author', content: 'Krasimir Stefanov', isEmpty: false },
  date: { name: 'date', content: new Date(), isEmpty: true },
  robots: { name: 'robots', content: 'index, follow', isEmpty: false },
  charset: { charset: 'UTF-8' }
}

@Injectable({ providedIn: 'root' })
export class MetadataService {  
  metas: Metadata = defaultMetadata;

  constructor(
    private titleService: Title,
    private metaService: Meta) { }

  updateTitle(title: string) {
    this.titleService.setTitle(`${this.metas.title} - ${title}`);
  }

  updateAllMetas(metas: Metadata = null) {
    if (metas === null) {
      metas = this.metas;
    }

    const relevantKeys = Object.keys(metas).filter(x => x !== 'title');
    const rMeta: Metadata = {};
    this.metaService.removeTag('charset="UTF-8"');
    this.metaService.removeTag('charset="utf-8"');
    for (let i = 0; i < relevantKeys.length; i++) {
      const key = relevantKeys[i];
      this.metaService.removeTag(`name="${key}"`);
      let value = metas[key];
      rMeta[key] = value;
      let isEmpty = false;
      if (value.hasOwnProperty('isEmpty')) {
        isEmpty = rMeta[key]['isEmpty'];
        rMeta[key] = { name: rMeta[key]['name'], content: rMeta[key]['content'] };
      }
      
      if (isEmpty) {
        continue;
      }

      this.metaService.updateTag(rMeta[key] as MetaDefinition);
    }    
  }
}
