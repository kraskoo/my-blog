import { NgModule } from '@angular/core';
import { HomeComponent } from './core/shared/home/home.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: './core/auth/auth.module#AuthModule' },
  { path: 'post', loadChildren: './core/post/post.module#PostModule' },
  { path: 'comment', loadChildren: './core/comment/comment.module#CommentModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
