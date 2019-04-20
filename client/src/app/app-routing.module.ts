import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import HomeResolver from './core/resolvers/home.resolver';

import { HomeComponent } from './core/shared/home/home.component';
import { AboutComponent } from './core/shared/about/about.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, resolve: { posts: HomeResolver } },
  { path: 'about', component: AboutComponent },
  { path: 'auth', loadChildren: './core/auth/auth.module#AuthModule' },
  { path: 'post', loadChildren: './core/post/post.module#PostModule' },
  { path: 'comment', loadChildren: './core/comment/comment.module#CommentModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
