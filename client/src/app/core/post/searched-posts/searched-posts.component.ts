import { Component, OnInit } from '@angular/core';

import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searched-posts',
  templateUrl: './searched-posts.component.html',
  styleUrls: ['./searched-posts.component.css']
})
export class SearchedPostsComponent implements OnInit {
  search = '';
  posts: Post[];
  shortContents: string[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.search = this.route.snapshot.params['search'];
    // tslint:disable-next-line: no-string-literal
    this.posts = this.route.snapshot.data['posts'];
    this.posts.forEach(post => {
      const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
      const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
      this.shortContents.push(content);
    });
  }
}
