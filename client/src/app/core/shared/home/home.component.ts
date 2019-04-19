import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post.service';

import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { CommentModel } from '../../models/comment.model';

interface ExtendedPost {
  _id: string;
  title: string;
  content: string;
  author: User;
  comments: CommentModel[];
  creationDate: Date;
  shortContent: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  shortContents: string[] = [];

  constructor(
    private postService: PostService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.postService.getAll().subscribe(data => {
      if (data.success) {
        this.posts = data.posts;
        this.posts.forEach(post => {
          const paragraphs = post.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
          const content = `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>`;
          this.shortContents.push(content);
        });
      } else {
        this.toastr.error(data.message);
      }
    });
  }

  get topTwoLikedPosts(): ExtendedPost[] {
    const posts: ExtendedPost[] = [];
    this.posts.sort((a, b) => {
      const likesDiff = b.likes - a.likes;
      if (likesDiff === 0) {
        const lengthDiff = b.comments.length - a.comments.length;
        if (lengthDiff === 0) {
          return b.creationDate.getDate() - a.creationDate.getDate();
        }

        return lengthDiff;
      }

      return likesDiff;
    }).slice(0, 2).forEach(p => {
      const paragraphs = p.content.split(/<[^>]*>/gm).filter(x => x !== '' && x.length > 5);
      posts.push({ ...p, shortContent: `<p>${paragraphs[0]}</p> <p>${paragraphs[1]} ...</p>` });
    });
    return posts;
  }
}
