import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AngularEditorConfig } from '@kolkov/angular-editor';

import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

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
    private router: Router
  ) {}

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

  onSubmit() {
    if (this.form.valid) {
      const content = this.htmlContent;
      const author = this.userService.user.id;
      const title = this.form.controls.title.value;
      const creationDate = this.form.controls.date.value;
      this.postService.createPost(title, content, author, creationDate).subscribe(data => {
        if (data.success) {
          this.router.navigate([ '/' ]);
        } else {}
      });
    }
  }
}
