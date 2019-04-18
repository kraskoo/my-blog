import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PipeModule } from '../pipes/pipe.module';
import { AuthRoutingModule } from './auth-routing.module';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ChangeProfilePictureComponent } from './change-profile-picture/change-profile-picture.component';
import { SetAdminRoleComponent } from './set-admin-role/set-admin-role.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ChangeProfilePictureComponent,
    SetAdminRoleComponent,
    AddInfoComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    AngularEditorModule,
    PipeModule
  ]
})
export class AuthModule {}
