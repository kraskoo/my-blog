import { Component, OnInit } from '@angular/core';

import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-archive-posts',
  templateUrl: './archive-posts.component.html',
  styleUrls: ['./archive-posts.component.css']
})
export class ArchivePostsComponent implements OnInit {
  date = '';
  posts: Post[];
  shortContents: string[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.date = `${this.route.snapshot.params['month']}-${this.route.snapshot.params['year']}`;
    // tslint:disable-next-line: no-string-literal
    this.posts = this.route.snapshot.data['posts'];
    this.posts.forEach(post => {
      const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
      const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
      this.shortContents.push(content);
    });
  }
}
