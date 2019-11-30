import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from '../../models/post.model';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-searched-posts',
  templateUrl: './searched-posts.component.html',
  styleUrls: ['./searched-posts.component.css']
})
export class SearchedPostsComponent implements OnInit {
  search = '';
  posts: Observable<Post[]>;
  shortContents: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService) { }

  ngOnInit() {
    this.posts = this.route.params.pipe(switchMap((p: Params) => {
      this.shortContents = [];
      this.search = p['search'];
      return this.postService.getSearched(this.search);
    }));
    this.posts.subscribe(data => {
      (data as Post[]).forEach(post => {
        const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
        const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
        this.shortContents.push(content);
      });
    });
  }
}
