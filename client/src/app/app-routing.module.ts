import { NgModule } from '@angular/core';
import { HomeComponent } from './core/shared/home/home.component';
import { Routes, RouterModule } from '@angular/router';

import { AnonymousGuard } from './core/guards/anonymous.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

import { SigninComponent } from './core/auth/signin/signin.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { ChangeProfilePictureComponent } from './core/auth/change-profile-picture/change-profile-picture.component';
import { SetAdminRoleComponent } from './core/auth/set-admin-role/set-admin-role.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'auth/signin', component: SigninComponent, canActivate: [ AnonymousGuard ] },
  { path: 'auth/signup', component: SignupComponent, canActivate: [ AnonymousGuard ] },
  { path: 'auth/changePicture', component: ChangeProfilePictureComponent, canActivate: [ AuthGuard ] },
  { path: 'auth/setToAdmin', component: SetAdminRoleComponent, canActivate: [ AdminGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
