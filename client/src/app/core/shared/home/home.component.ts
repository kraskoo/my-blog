import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

import { PostService } from '../../services/post.service';
import { MetadataService } from '../../services/meta-data-service';

import { Post, ExtendedPost } from '../../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: ExtendedPost[] = [];
  dates: Date[] = [];
  topTwoLiked: ExtendedPost[] = [];
  pageNumbers: number[] = [];
  page = 1;
  pages = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private metadataService: MetadataService) { }

  ngOnInit() {
    this.metadataService.updateTitle('Home');
    this.metadataService.updateAllMetas();
    this.proceedData();
  }

  proceedData() {
    this.route.params.pipe(switchMap((p: Params) => {
      this.page = Number(p.page);
      return this.postService.getAll(true, this.page).pipe(
        // tslint:disable-next-line: no-shadowed-variable
        map(data => data.data)
      );
      // tslint:disable-next-line: no-shadowed-variable
    })).subscribe(function(data: { posts: Post[], dates: Date[], topTwoLiked: Post[], count: number }) {
      // tslint:disable-next-line: no-string-literal
      const postCount = data.count > 5 ? data.count / 5 : data.count;
      // tslint:disable-next-line: radix
      const intNumber = parseInt(postCount.toString());
      this.pages = intNumber < postCount ? 1 + intNumber : postCount;
      this.pageNumbers = [];
      for (let i = 1; i <= this.pages; i++) {
        this.pageNumbers.push(i);
      }

      // tslint:disable-next-line: no-string-literal
      this.posts = this.convertToExtendedPost(data.posts);
      // tslint:disable-next-line: no-string-literal
      this.dates = data.dates;
      // tslint:disable-next-line: no-string-literal
      this.topTwoLiked = this.convertToExtendedPost(data.topTwoLiked);
    }.bind(this));
  }

  convertToExtendedPost(posts: Post[]): ExtendedPost[] {
    return posts.map(post => {
      const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
      const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
      return { ...post, shortContent: content };
    });
  }

  changePage(newPage: number) {
    this.router.navigate([`/home/${newPage}`]);
  }
}
