import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

import { Post } from '../../models/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, DoCheck {
  @ViewChild('f') form: NgForm;

  post: Post;
  title = '';
  htmlContent = '';
  date: Date;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '25rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'http://localhost:65535/upload/images'
  };

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {}

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.post = this.route.snapshot.data['post'];
    this.title = this.post.title;
    this.htmlContent = this.post.content;
    this.date = this.post.creationDate;
  }

  ngDoCheck() {
    if (!this.userService.hasLoggedinUser() || this.post.author._id !== this.userService.user.id) {
      this.router.navigate([ '/' ]);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const title = this.form.controls.title.value;
      const content = this.htmlContent;
      const creationDate = this.form.controls.date.value;
      this.postService.edit(this.post._id, title, content, creationDate).subscribe(data => {
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
