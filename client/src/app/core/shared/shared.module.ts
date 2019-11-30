import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { AppCommonModule } from '../app-common/app-common.module';

import { PipeModule } from '../pipes/pipe.module';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PostModule } from '../post/post.module';
import { TopTwoLikedComponent } from './top-two-liked/top-two-liked.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    TopTwoLikedComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AppCommonModule,
    FormsModule,
    PipeModule,
    PostModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule {}
