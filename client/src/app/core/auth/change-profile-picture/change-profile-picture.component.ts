import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})
export class ChangeProfilePictureComponent {
  @ViewChild('f') form: NgForm;
  private file;
  private fileName;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  onChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    this.fileName = file.name;
    reader.readAsDataURL(file);
    reader.onload = function() {
      this.file = reader.result;
    }.bind(this);
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.changeProfilePicture(this.file, this.fileName, this.userService.user.id).subscribe(data => {
        if (data.success) {
          const user = this.userService.user;
          user.profilePicture = data.image;
          this.userService.removeUser();
          this.userService.addUser(user);
          this.router.navigate([ '/' ]);
        } else {

        }
      });
    }
  }
}
