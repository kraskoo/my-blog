import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminGuard } from '../guards/admin.guard';
import PostResolver from '../resolvers/post.resolver';
import ArchivePostsResolver from '../resolvers/archive-posts.resolver';

import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { SearchedPostsComponent } from './searched-posts/searched-posts.component';
import { ArchivePostsComponent } from './archive-posts/archive-posts.component';

const postRoutes: Routes = [
  { path: 'create', component: CreatePostComponent, canActivate: [AdminGuard] },
  { path: ':id', component: PostComponent, resolve: { post: PostResolver } },
  { path: 'edit/:id', component: EditPostComponent, resolve: { post: PostResolver } },
  { path: 'delete/:id', component: DeletePostComponent, resolve: { post: PostResolver } },
  { path: 'search/:search', component: SearchedPostsComponent },
  { path: 'archives/:month/:year', component: ArchivePostsComponent, resolve: { posts: ArchivePostsResolver } }
];

@NgModule({
  imports: [
    RouterModule.forChild(postRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostRoutingModule { }
