import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

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
}
