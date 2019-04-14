import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ChangeProfilePictureComponent } from './change-profile-picture/change-profile-picture.component';
import { SetAdminRoleComponent } from './set-admin-role/set-admin-role.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ChangeProfilePictureComponent,
    SetAdminRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthModule {}
