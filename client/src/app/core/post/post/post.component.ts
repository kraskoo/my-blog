import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../models/post.model';
import { UserService } from '../../services/user.service';
import { CommentModel } from '../../models/comment.model';
import { angularEditorConfig } from '../../services/app.services';
import { MetadataService } from '../../services/meta-data-service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit {
  @ViewChild('f', { static: false }) form: NgForm;
  post: Post;
  hasAuthorInfo = false;
  htmlContent = '';

  config: AngularEditorConfig = { ...angularEditorConfig, height: '10rem', minHeight: '10rem' };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private postService: PostService,
    private commentService: CommentService,
    private metadataService: MetadataService) { }

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
    const title = `${this.metadataService.metas['title'].toString()} - ${this.post.title} by ${this.post.author.firstName} ${this.post.author.lastName}`;
    this.metadataService.updateTitle(title);
    const metas = {
      ...this.metadataService.metas,
      description: { name: 'description', content: title },
      keywords: { name: 'keywords', content: (title.split(/[ \-,\n]+/gm).join(',')) },
      date: { name: 'date', content: this.post.creationDate, isEmpty: false },
      author: { name: 'author', content: `${this.post.author.firstName} ${this.post.author.lastName}` }
    };
    this.metadataService.updateAllMetas(metas);
    this.hasAuthorInfo = this.post.author.info !== '';
  }

  postLike() {
    if (this.userService.hasLoggedinUser) {
      this.postService.getLike(this.post._id).subscribe(data => {
        if (data.success) {
          ++this.post.likes;
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }

  hasLoggedinUser(): boolean {
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

  ngAfterViewInit() {
    window.scroll(0, 0);
  }
}
