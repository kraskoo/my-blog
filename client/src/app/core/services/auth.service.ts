import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  signin(email: string, password: string) {
    return this.http.post<{
      message: string,
      success: boolean,
      token: string,
      user: User
    }>('auth/signin', { email, password });
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post<{
      message: string,
      success: boolean
    }>('auth/signup', { firstName, lastName, email, password });
  }

  changeProfilePicture(file: string, fileName: string, userId: string) {
    return this.http.post<{
      success: boolean,
      message: string,
      image: string
    }>('upload/changeProfilePicture', { file, fileName, userId });
  }

  getById(id: string) {
    return this.http.get<{
      success: boolean,
      message: string,
      user: User
    }>(`auth/get/${id}`).pipe(
      map(data => data.user)
    );
  }

  getAllRegularUsers(): Observable<{ _id: string, firstName: string, lastName: string }[]> {
    return this.http.get<{ _id: string, firstName: string, lastName: string }[]>('auth/allRegular').pipe(
      // tslint:disable-next-line: no-string-literal
      map(data => data['users']));
  }

  setToAdmin(id: string) {
    return this.http.get<{
      success: boolean,
      message: string
    }>(`auth/setadmin/${id}`);
  }

  addInfo(id: string, info: string) {
    return this.http.post<{
      success: boolean,
      message: string
    }>(`auth/addinfo/${id}`, { info });
  }
}
