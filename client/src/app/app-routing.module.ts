import { NgModule } from '@angular/core';
import { HomeComponent } from './core/shared/home/home.component';
import { Routes, RouterModule } from '@angular/router';

import { AnonymousGuard } from './core/guards/anonymous.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

import UserInfoResolver from './core/resolvers/user-info.resolver';
import { SigninComponent } from './core/auth/signin/signin.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { ChangeProfilePictureComponent } from './core/auth/change-profile-picture/change-profile-picture.component';
import { SetAdminRoleComponent } from './core/auth/set-admin-role/set-admin-role.component';
import { AddInfoComponent } from './core/auth/add-info/add-info.component';
import { InfoComponent } from './core/auth/info/info.component';

import PostResolver from './core/resolvers/post.resolver';
import { CreatePostComponent } from './core/post/create-post/create-post.component';
import { PostComponent } from './core/post/post/post.component';
import { EditPostComponent } from './core/post/edit-post/edit-post.component';
import { DeletePostComponent } from './core/post/delete-post/delete-post.component';

import CommentResolver from './core/resolvers/comment.resolver';
import { EditCommentComponent } from './core/comment/edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './core/comment/delete-comment/delete-comment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'auth', children: [
      { path: 'signin', component: SigninComponent, canActivate: [AnonymousGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [AnonymousGuard] },
      { path: 'changePicture', component: ChangeProfilePictureComponent, canActivate: [AuthGuard] },
      { path: 'setToAdmin', component: SetAdminRoleComponent, canActivate: [AdminGuard] },
      { path: 'addInfo', component: AddInfoComponent, canActivate: [AdminGuard] },
      { path: 'info/:id', component: InfoComponent, resolve: { user: UserInfoResolver } }
    ]
  },
  {
    path: 'post', children: [
      { path: 'create', component: CreatePostComponent, canActivate: [AdminGuard] },
      { path: ':id', component: PostComponent, resolve: { post: PostResolver } },
      { path: 'edit/:id', component: EditPostComponent, resolve: { post: PostResolver } },
      { path: 'delete/:id', component: DeletePostComponent, resolve: { post: PostResolver } }
    ]
  },
  {
    path: 'comment', children: [
      { path: 'edit/:id', component: EditCommentComponent, resolve: { comment: CommentResolver } },
      { path: 'delete/:id', component: DeleteCommentComponent, resolve: { comment: CommentResolver } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
