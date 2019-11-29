import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {}

  onSubmit() {
    if (this.form.valid) {
      const firstName = this.form.controls.firstName.value;
      const lastName = this.form.controls.lastName.value;
      const email = this.form.controls.email.value;
      const password = this.form.controls.password.value;
      this.authService.signup(firstName, lastName, email, password).subscribe(registerData => {
        if (registerData.success) {
          this.authService.signin(email, password).subscribe(loginData => {
            if (loginData.success) {
              this.userService.addUser(loginData.user);
              this.router.navigate([ '/' ]);
              this.toastr.success(loginData.message);
            } else {
              this.toastr.error(loginData.message);
            }
          });
        } else {
          this.toastr.error(registerData.message);
        }
      });
    }
  }
}
