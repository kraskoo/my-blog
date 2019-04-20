import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../../models/post.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { angularEditorConfig } from '../../services/app.services';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit, DoCheck {
  @ViewChild('f') form: NgForm;

  post: Post;
  title = '';
  htmlContent = '';
  date: Date;
  config: AngularEditorConfig = { ...angularEditorConfig, editable: false };

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

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
    this.postService.delete(this.post._id).subscribe(data => {
      if (data.success) {
        this.router.navigate([ '/' ]);
        this.toastr.success(data.message);
      } else {
        this.toastr.error(data.message);
      }
    });
  }
}
