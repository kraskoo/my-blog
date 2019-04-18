import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import CommentResolver from '../resolvers/comment.resolver';

import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';

const commentRoutes: Routes = [
  { path: 'edit/:id', component: EditCommentComponent, resolve: { comment: CommentResolver } },
  { path: 'delete/:id', component: DeleteCommentComponent, resolve: { comment: CommentResolver } }
];

@NgModule({
  imports: [
    RouterModule.forChild(commentRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CommentRoutingModule {}
