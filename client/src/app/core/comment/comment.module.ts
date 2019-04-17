import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';

@NgModule({
  declarations: [
    EditCommentComponent,
    DeleteCommentComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularEditorModule,
    FormsModule
  ]
})
export class CommentModule {}
