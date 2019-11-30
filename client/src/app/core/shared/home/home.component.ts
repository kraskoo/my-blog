import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Post, ExtendedPost } from '../../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: ExtendedPost[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.posts = (this.route.snapshot.data['posts'] as Post[]).map(post => {
      const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
      const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
      return { ...post, shortContent: content };
    });
  }
}
