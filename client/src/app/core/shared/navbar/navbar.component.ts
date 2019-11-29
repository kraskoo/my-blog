import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(
    private userService: UserService,
    private router: Router) { }

  get hasLoggedinUser(): boolean {
    return this.userService.hasLoggedinUser();
  }

  isAdmin() {
    return this.userService.hasRole('Admin');
  }

  get user() {
    return this.userService.user;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  onSubmit() {
    const search = this.form.controls.search.value;
    this.form.reset();
    this.router.navigate([`/post/search/${search}`]);
  }
}
