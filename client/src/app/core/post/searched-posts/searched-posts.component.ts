import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PostService } from '../../services/post.service';
import { MetadataService } from '../../services/meta-data-service';
import { Post, ExtendedPost } from '../../models/post.model';

@Component({
  selector: 'app-searched-posts',
  templateUrl: './searched-posts.component.html',
  styleUrls: ['./searched-posts.component.css']
})
export class SearchedPostsComponent implements OnInit {
  search = '';
  posts: Observable<Post[]>;
  extendedPosts: ExtendedPost[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private metadataService: MetadataService) { }

  ngOnInit() {
    this.metadataService.updateTitle('Searched Posts');
    this.metadataService.updateAllMetas();
    this.posts = this.route.params.pipe(switchMap((p: Params) => {
      this.extendedPosts = [];
      // tslint:disable-next-line: no-string-literal
      this.search = p['search'];
      return this.postService.getSearched(this.search);
    }));
    this.posts.subscribe(function(data: Post[]) {
      data.forEach(function(post: Post) {
        this.extendedPosts.push(post);
        const paragraphs = post.content.split(/<[^>]*>/gm).filter(p => p.length > 5);
        this.extendedPosts[this.extendedPosts.length - 1].shortContent = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
      }.bind(this));
    }.bind(this));
  }
}
