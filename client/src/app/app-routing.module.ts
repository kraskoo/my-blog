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
import { CreatePostComponent } from './core/post/create-post/create-post.component';
import { PostComponent } from './core/post/post/post.component';
import PostResolver from './core/resolvers/post.resolver';
import { EditPostComponent } from './core/post/edit-post/edit-post.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth', children: [
      { path: 'signin', component: SigninComponent, canActivate: [AnonymousGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [AnonymousGuard] },
      { path: 'changePicture', component: ChangeProfilePictureComponent, canActivate: [AuthGuard] },
      { path: 'setToAdmin', component: SetAdminRoleComponent, canActivate: [AdminGuard] }
    ]
  },
  {
    path: 'post', children: [
      { path: 'create', component: CreatePostComponent, canActivate: [AdminGuard] },
      { path: ':id', component: PostComponent, resolve: { post: PostResolver } },
      { path: 'edit/:id', component: EditPostComponent, resolve: { post: PostResolver }, canActivate: [AdminGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
