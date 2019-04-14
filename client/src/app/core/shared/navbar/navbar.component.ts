import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private userService: UserService,
    private router: Router) {}

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
    this.router.navigate([ '/' ]);
  }
}
