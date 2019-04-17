import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CommentModel } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) { }

  createComment(content: string, authorId: string, postId: string) {
    return this.http.post<{
      success: boolean,
      message: string
    }>('comment/create', { content, author: authorId, postId });
  }

  getById(id: string) {
    return this.http.get<CommentModel>(`comment/get/${id}`).pipe(
      // tslint:disable-next-line: no-string-literal
      map(data => data['comment'])
    );
  }

  edit(id: string, content: string) {
    return this.http.post<{
      success: boolean,
      message: string
    }>(`comment/edit/${id}`, { content });
  }

  delete(id: string) {
    return this.http.post<{
      success: boolean,
      message: string
    }>(`comment/delete/${id}`, {});
  }
}
