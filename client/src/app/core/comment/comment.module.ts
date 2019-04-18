import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';
import { CommentRoutingModule } from './comment-routing.module';

@NgModule({
  declarations: [
    EditCommentComponent,
    DeleteCommentComponent
  ],
  imports: [
    CommonModule,
    CommentRoutingModule,
    AngularEditorModule,
    FormsModule
  ]
})
export class CommentModule {}
