import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class AuthorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // tslint:disable-next-line: no-string-literal
    const post: Post = route.data['post'];
    // tslint:disable-next-line: no-string-literal
    if (this.userService.hasLoggedinUser() && this.userService.user.id === post.author['_id']) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
