import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

import { CommentService } from '../../services/comment.service';
import { Post } from '../../models/post.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  post: Post;
  htmlContent = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '25rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'http://localhost:65535/upload/images',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private commentService: CommentService) {}

  get isAuthor(): boolean {
    // tslint:disable-next-line: no-string-literal
    return this.userService.hasLoggedinUser() && this.userService.user.id === this.post.author['_id'];
  }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.post = this.route.snapshot.data['post'];
    console.log(this.post);
  }

  canShowCommentForm(): boolean {
    return this.userService.hasLoggedinUser();
  }

  onSubmit() {
    if (this.htmlContent !== '') {
      const authorId = this.userService.user.id;
      const postId = this.post._id;
      this.commentService.createComment(this.htmlContent, authorId, postId).subscribe(data => {
        if (data.success) {
          this.router.navigate([ '/' ]);
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }
}
