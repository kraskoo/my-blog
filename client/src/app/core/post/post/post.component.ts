import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

import { CommentService } from '../../services/comment.service';
import { Post } from '../../models/post.model';
import { UserService } from '../../services/user.service';
import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  post: Post;
  hasAuthorInfo = false;
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '10rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'http://localhost:65535/upload/images'
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private commentService: CommentService) { }

  get isAuthorOnPost(): boolean {
    return this.userService.hasLoggedinUser() &&
      this.userService.user.id === this.post.author._id;
  }

  isAuthorOnComment(comment: CommentModel): boolean {
    return this.userService.hasLoggedinUser() &&
      comment.author._id === this.userService.user.id;
  }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.post = this.route.snapshot.data['post'];
    this.hasAuthorInfo = this.post.author.info !== '';
  }

  canShowCommentForm(): boolean {
    return this.userService.hasLoggedinUser();
  }

  get hasValue(): boolean {
    return this.htmlContent.length > 0;
  }

  onSubmit() {
    const hasXSS = this.htmlContent.match(/<script.*>.*<\/script>/gm) !== null;
    if (hasXSS) {
      this.toastr.warning('Cross site scripting is detect', 'Hack warning');
      return;
    }

    if (this.htmlContent !== '') {
      const authorId = this.userService.user.id;
      const postId = this.post._id;
      this.commentService.createComment(this.htmlContent, authorId, postId).subscribe(data => {
        if (data.success) {
          this.router.navigate(['/']);
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }
}
