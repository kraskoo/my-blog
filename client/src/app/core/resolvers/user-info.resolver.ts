import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { User } from '../models/user.model';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export default class UserInfoResolver implements Resolve<User> {
  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // tslint:disable-next-line: no-string-literal
    return this.authService.getById(route.params['id']);
  }
}
