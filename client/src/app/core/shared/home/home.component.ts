import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

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
          const content = `${paragraphs[0]} ${paragraphs[1]} ${paragraphs[2]} ${paragraphs[3]} ...`;
          this.shortContents.push(content);
        });
      } else {
        this.toastr.error(data.message);
      }
    });
  }
}
