import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ChangeProfilePictureComponent } from './change-profile-picture/change-profile-picture.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ChangeProfilePictureComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SignupComponent,
    SigninComponent
  ]
})
export class AuthModule {}
