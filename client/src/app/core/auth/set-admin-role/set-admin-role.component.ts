import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { MetadataService } from '../../services/meta-data-service';

@Component({
  selector: 'app-set-admin-role',
  templateUrl: './set-admin-role.component.html',
  styleUrls: ['./set-admin-role.component.css']
})
export class SetAdminRoleComponent implements OnInit {
  @ViewChild('f', { static: true }) form: NgForm;
  users$: Observable<{ _id: string, firstName: string, lastName: string }[]>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private metadataService: MetadataService) {}

  ngOnInit(): void {
    this.metadataService.updateTitle('Set To Admin Role');
    this.metadataService.updateAllMetas();
    this.users$ = this.authService.getAllRegularUsers();
  }

  onSubmit() {
    if (this.form.valid) {
      const user = this.form.controls.users.value;
      this.authService.setToAdmin(user).subscribe(data => {
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
