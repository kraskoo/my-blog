import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import UserInfoResolver from '../resolvers/user-info.resolver';

import { SigninComponent } from './signin/signin.component';
import { AnonymousGuard } from '../guards/anonymous.guard';
import { SignupComponent } from './signup/signup.component';
import { ChangeProfilePictureComponent } from './change-profile-picture/change-profile-picture.component';
import { SetAdminRoleComponent } from './set-admin-role/set-admin-role.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { InfoComponent } from './info/info.component';

const authRoutes: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [AnonymousGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AnonymousGuard] },
  { path: 'changePicture', component: ChangeProfilePictureComponent, canActivate: [AuthGuard] },
  { path: 'setToAdmin', component: SetAdminRoleComponent, canActivate: [AdminGuard] },
  { path: 'addInfo', component: AddInfoComponent, canActivate: [AdminGuard] },
  { path: 'info/:id', component: InfoComponent, resolve: { user: UserInfoResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
