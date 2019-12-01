import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MetadataService } from '../../services/meta-data-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private metadataService: MetadataService) { }

  ngOnInit(): void {
    this.metadataService.updateTitle('Login');
    this.metadataService.updateAllMetas();
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.controls.email.value;
      const password = this.form.controls.password.value;
      this.authService.signin(email, password).subscribe(data => {
        if (data.success) {
          this.userService.addUser(data.user);
          this.router.navigate([ '/' ]);
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }
}
