import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  page: number = 1;
  pages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private metadataService: MetadataService) { }

  ngOnInit() {
    this.metadataService.updateTitle('Home');
    this.metadataService.updateAllMetas();
    // tslint:disable-next-line: no-string-literal
    const data = this.route.snapshot.data['data'];
    this.proceedData(data, 1);
  }

  private convertToExtendedPost(posts: Post[]): ExtendedPost[] {
    return posts.map(post => {
      const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
      const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
      return { ...post, shortContent: content };
    });
  }

  proceedData(data: any, currentPage: number = 1) {
    this.page = currentPage;
    const postCount = Number(data['count']) / 5;
    const intNumber = parseInt(postCount.toString());
    if (intNumber < postCount) {
      this.pages = 1 + intNumber;
    } else {
      this.pages = postCount;
    }
    
    for (let i = 1; i <= this.pages; i++) {
      this.pageNumbers.push(i);
    }

    console.log(this.posts);
    this.posts = this.convertToExtendedPost(data['posts']);
    this.dates = data['dates'];
    this.topTwoLiked = this.convertToExtendedPost(data['topTwoLiked']);
  }

  changePage(newPage: number) {
    this.posts = [];
    this.dates = [];
    this.topTwoLiked = [];
    this.pageNumbers = [];
    this.page = 1;
    this.pages = 0;
    this.postService.getAll(true, newPage).subscribe(function(data: { data: any; }) {
      this.proceedData(data.data, newPage);
    }.bind(this));
  }
}
