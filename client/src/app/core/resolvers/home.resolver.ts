import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { PostService } from '../services/post.service';

import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export default class HomeResolver implements Resolve<{ posts: Post[], dates: Date[], topTwoLiked: Post[], count: number }> {
  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // tslint:disable-next-line: no-string-literal
    const page = Number(route.params['page']);
    // tslint:disable-next-line: no-string-literal
    return this.postService.getAll(true, page).pipe(
      map(data => data.data)
    );
  }
}
