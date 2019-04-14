import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-set-admin-role',
  templateUrl: './set-admin-role.component.html',
  styleUrls: ['./set-admin-role.component.css']
})
export class SetAdminRoleComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  users$: Observable<{ _id: string, firstName: string, lastName: string }[]>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users$ = this.authService.getAllRegularUsers();
  }

  isDefaultSelected(id: string) {
    return id === '1';
  }

  onSubmit() {
    if (this.form.valid) {
      const user = this.form.controls.users.value;
      this.authService.setToAdmin(user).subscribe(data => {
        if (data.success) {
          this.router.navigate([ '/' ]);
        } else {}
      });
    }
  }
}
