import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { MetadataService } from '../../services/meta-data-service';
import { angularEditorConfig } from '../../services/app.services';

import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.css']
})
export class DeleteCommentComponent implements OnInit, DoCheck {
  @ViewChild('f', { static: true }) form: NgForm;
  comment: CommentModel;

  htmlContent = '';
  config: AngularEditorConfig = {  ...angularEditorConfig, editable: false };

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private metadataService: MetadataService) {}

  ngOnInit() {
    this.metadataService.updateTitle('Delete Comment');
    this.metadataService.updateAllMetas();
    // tslint:disable-next-line: no-string-literal
    this.comment = this.route.snapshot.data['comment'];
    this.htmlContent = this.comment.content;
  }

  ngDoCheck() {
    if (!this.userService.hasLoggedinUser() ||
      !(this.comment.author._id === this.userService.user.id ||
        this.userService.user.id === this.comment.post.author._id)) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.commentService.delete(this.comment._id).subscribe(data => {
      if (data.success) {
        this.router.navigate(['/']);
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message);
      }
    });
  }
}
