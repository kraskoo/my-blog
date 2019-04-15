import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { SafePipe } from '../pipes/safe.pipe';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [
    CreatePostComponent,
    PostComponent,
    SafePipe,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularEditorModule,
    FormsModule
  ]
})
export class PostModule {}
