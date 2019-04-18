import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CommentService } from '../services/comment.service';

import { CommentModel } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export default class CommentResolver implements Resolve<CommentModel> {
  constructor(private commentService: CommentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // tslint:disable-next-line: no-string-literal
    return this.commentService.getById(route.params['id']);
  }
}
