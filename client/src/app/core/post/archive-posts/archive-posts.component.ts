import { Component, OnInit } from '@angular/core';

import { Post, ExtendedPost } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../services/meta-data-service';
import { getMonthAsWord } from '../../services/date-service';

@Component({
  selector: 'app-archive-posts',
  templateUrl: './archive-posts.component.html',
  styleUrls: ['./archive-posts.component.css']
})
export class ArchivePostsComponent implements OnInit {
  date = '';
  posts: ExtendedPost[];

  constructor(
    private route: ActivatedRoute,
    private metadataService: MetadataService) { }

  ngOnInit() {
    this.metadataService.updateTitle(
      // tslint:disable-next-line: no-string-literal
      `Archives - ${getMonthAsWord(Number(this.route.snapshot.params['month']))}, ${this.route.snapshot.params['year']}`);
    this.metadataService.updateAllMetas();
    // tslint:disable-next-line: no-string-literal
    this.date = `${this.route.snapshot.params['month']}-${this.route.snapshot.params['year']}`;
    // tslint:disable-next-line: no-string-literal
    this.posts = (this.route.snapshot.data['posts'] as Post[]).map(post => {
      const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
      const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
      return { ...post, shortContent: content };
    });
  }
}
