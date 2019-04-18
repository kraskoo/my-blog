import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  declarations: [
    PostComponent,
    CreatePostComponent,
    EditPostComponent,
    DeletePostComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularEditorModule,
    FormsModule,
    PipeModule
  ]
})
export class PostModule {}
