import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/shared/home/home.component';
import { AboutComponent } from './core/shared/about/about.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home/1' },
  { path: 'home', pathMatch: 'full', redirectTo: 'home/1' },
  { path: 'home/:page', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
  { path: 'post', loadChildren: () => import('./core/post/post.module').then(m => m.PostModule) },
  { path: 'comment', loadChildren: () => import('./core/comment/comment.module').then(m => m.CommentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
