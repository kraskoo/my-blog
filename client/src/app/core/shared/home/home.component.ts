import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  constructor(
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postService.getAll().subscribe(data => {
      if (data.success) {
        this.posts = data.posts;
      }
    });
  }
}
