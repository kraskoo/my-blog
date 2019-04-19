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
  topTwoLikesPosts: ExtendedPost[];
  archives: { key: string, value: string }[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeProperties();
  }

  private initializeProperties() {
    this.initializePosts();
    this.initializeTopTwoLikesPosts();
    this.initializeArchives();
  }

  private initializePosts() {
    // tslint:disable-next-line: no-string-literal
    this.posts = (this.route.snapshot.data['posts'] as Post[]).map(post => {
      const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
      const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
      return { ...post, shortContent: content };
    });
  }

  private initializeTopTwoLikesPosts() {
    this.topTwoLikesPosts = this.posts.sort((a, b) => {
      const likesDiff = b.likes - a.likes;
      if (likesDiff === 0) {
        const lengthDiff = b.comments.length - a.comments.length;
        if (lengthDiff === 0) {
          return b.creationDate.getDate() - a.creationDate.getDate();
        }

        return lengthDiff;
      }

      return likesDiff;
    }).slice(0, 2);
  }

  private initializeArchives() {
    this.posts.forEach(p => {
      const creationDate = new Date(p.creationDate);
      const month = creationDate.getMonth();
      const year = creationDate.getFullYear();
      const key = `${month}-${year}`;
      const value = `/post/archives/${month}/${year}`;
      if (this.archives.filter(a => a.key === key).length === 0) {
        this.archives.push({ key, value });
      }
    });
  }
}
