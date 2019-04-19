import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { PostService } from '../services/post.service';

import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export default class HomeResolver implements Resolve<Post[]> {
  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // tslint:disable-next-line: no-string-literal
    return this.postService.getAll().pipe(
      map(data => data.posts)
    );
  }
}
