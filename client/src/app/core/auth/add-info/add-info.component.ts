import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MetadataService } from '../../services/meta-data-service';
import { angularEditorConfig } from '../../services/app.services';

@Component({
  selector: 'app-add-info',
  templateUrl: './add-info.component.html',
  styleUrls: ['./add-info.component.css']
})
export class AddInfoComponent implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  htmlContent = '';
  config: AngularEditorConfig = angularEditorConfig;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private metadataService: MetadataService) { }

  ngOnInit(): void {
    this.metadataService.updateTitle('Add/Edit User Info');
    this.metadataService.updateAllMetas();
    if (this.userService.user.info !== '') {
      this.htmlContent = this.userService.user.info;
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

    if (this.form.valid) {
      this.authService.addInfo(this.userService.user.id, this.htmlContent).subscribe(data => {
        if (data.success) {
          this.router.navigate(['/']);
          const user = this.userService.user;
          user.info = this.htmlContent;
          this.userService.removeUser();
          this.userService.addUser(user);
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }
}
