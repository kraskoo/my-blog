import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  hasLoggedinUser(): boolean {
    return localStorage.getItem('user') !== null;
  }

  hasRole(role: string): boolean {
    return JSON.parse(localStorage.getItem('user')).roles.includes(role);
  }

  get user(): User {
    return JSON.parse(localStorage.getItem('user')) as User;
  }

  addUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }
}
