import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AngularEditorConfig } from '@kolkov/angular-editor';

import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { angularEditorConfig } from '../../services/app.services';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  @ViewChild('f') form: NgForm;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  get hasValidValue(): boolean {
    return this.htmlContent.length > 50;
  }

  onSubmit() {
    const hasXSS = this.htmlContent.match(/<script.*>.*<\/script>/gm) !== null;
    if (hasXSS) {
      this.toastr.warning('Cross site scripting is detect', 'Hack warning');
      return;
    }

    if (this.form.valid) {
      const content = this.htmlContent;
      const author = this.userService.user.id;
      const title = this.form.controls.title.value;
      const creationDate = this.form.controls.date.value;
      this.postService.createPost(title, content, author, creationDate).subscribe(data => {
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
