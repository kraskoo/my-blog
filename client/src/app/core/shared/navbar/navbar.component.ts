import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private userService: UserService) {}

  get hasLoggedinUser(): boolean {
    return this.userService.hasLoggedinUser();
  }

  get user() {
    return this.userService.user;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
