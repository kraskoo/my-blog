import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

import { resizeImage } from '../../services/image-processing.services';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})
export class ChangeProfilePictureComponent {
  @ViewChild('f', { static: true }) form: NgForm;
  label: string = 'No selected file.';
  isInvalid: boolean = false;
  private file: string;
  private fileName: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  onChange(event: Event) {
    const file = event.target['files'][0];
    this.label = this.fileName = file.name;
    const reader = new FileReader();
    resizeImage(event, 100).then(function(data: Blob) {
      reader.readAsDataURL(data);
      reader.addEventListener('load', function() {
        this.file = reader.result;
        this.isInvalid = false;
      }.bind(this));
    }.bind(this)).catch(function(error: string) {
      this.isInvalid = true;
      this.toastr.error(error);
    }.bind(this));
  }

  onSubmit() {
    if (!this.isInvalid && !this.form.invalid) {
      this.authService.changeProfilePicture(this.file, this.fileName, this.userService.user.id).subscribe(data => {
        if (data.success) {
          const user = this.userService.user;
          user.profilePicture = data.image;
          this.userService.removeUser();
          this.userService.addUser(user);
          this.router.navigate([ '/' ]);
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }
}
