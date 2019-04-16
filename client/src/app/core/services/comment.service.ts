import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  createComment(content: string, authorId: string, postId: string) {
    return this.http.post<{
      success: boolean,
      message: string
    }>('comment/create', { content, author: authorId, postId });
  }
}
