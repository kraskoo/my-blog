import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Post } from '../models/post.model';

import { PostService } from '../services/post.service';

@Injectable({ providedIn: 'root' })
export default class ArchivePostsResolver implements Resolve<Post[]> {
  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // tslint:disable-next-line: no-string-literal
    return this.postService.getArchives(Number(route.params['month']), Number(route.params['year']));
  }
}
