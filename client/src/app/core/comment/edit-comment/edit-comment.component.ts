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
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit, DoCheck {
  @ViewChild('f', { static: true }) form: NgForm;
  comment: CommentModel;

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private metadataService: MetadataService) { }

  ngOnInit() {
    this.metadataService.updateTitle('Edit Comment');
    this.metadataService.updateAllMetas();
    // tslint:disable-next-line: no-string-literal
    this.comment = this.route.snapshot.data['comment'];
    this.htmlContent = this.comment.content;
  }

  ngDoCheck() {
    if (!this.userService.hasLoggedinUser() || this.comment.author._id !== this.userService.user.id) {
      this.router.navigate([ '/' ]);
    }
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

    this.commentService.edit(this.comment._id, this.htmlContent).subscribe(data => {
      if (data.success) {
        this.router.navigate([ '/' ]);
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message);
      }
    });
  }
}
