import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) { }

  createPost(title: string, content: string, author: string, creationDate: Date) {
    return this.http.post<{
      success: boolean,
      message: string
    }>('post/create', { title, content, author, creationDate });
  }

  getAll(isRanged: boolean = false, page: number = 1) {
    return this.http.get<{
      success: boolean,
      message: string,
      data: { posts: Post[], dates: Date[], topTwoLiked: Post[], count: number }
    }>(isRanged ? `post/all/${page}?ranged=true` : `post/all/${page}`);
  }

  getSearched(searched: string) {
    return this.http.get<{
      success: boolean,
      message: string,
      posts: Post[]
    }>(`post/search/${searched}`).pipe(
      map(data => data.posts)
    );
  }

  getArchives(month: number, year: number) {
    return this.http.get<{
      success: boolean,
      message: string,
      posts: Post[]
    }>(`post/archives/${month}/${year}`).pipe(
      map(data => data.posts)
    );
  }

  getById(id: string) {
    return this.http.get<Post>(`post/get/${id}`).pipe(
      // tslint:disable-next-line: no-string-literal
      map(data => data['post']));
  }

  getLike(id: string) {
    return this.http.get<{
      success: boolean,
      message: string
    }>(`post/like/${id}`);
  }

  edit(id: string, title: string, content: string, creationDate: Date) {
    return this.http.post<{
      success: boolean,
      message: string
    }>(`post/edit/${id}`, { title, content, creationDate });
  }

  delete(id: string) {
    return this.http.post<{
      success: boolean,
      message: string
    }>(`post/delete/${id}`, {});
  }
}
